package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"reflect"
	"sort"
	"strings"
)

// RegistrationPayload required to register a device with humm
type RegistrationPayload struct {
	MerchantID      string `json:"x_merchant_id"`
	DeviceID        string `json:"x_device_id"`
	DeviceToken     string `json:"x_device_token"`
	OperatorID      string `json:"x_operator_id"`
	FirmwareVersion string `json:"x_firmware_version"`
	POSVendor       string `json:"x_pos_vendor"`
	TrackingData    string `json:"tracking_data,omitempty"`
	Signature       string `json:"signature"`
}

// AuthorisationPayload Payload used to send to humm
type AuthorisationPayload struct {
	MerchantID        string `json:"x_merchant_id"`
	DeviceID          string `json:"x_device_id"`
	OperatorID        string `json:"x_operator_id"`
	FirmwareVersion   string `json:"x_firmware_version"`
	PosTransactionRef string `json:"x_pos_transaction_ref"`
	PreApprovalCode   string `json:"x_pre_approval_code"`
	FinanceAmount     string `json:"x_finance_amount"`
	PurchaseAmount    string `json:"x_purchase_amount"`
	Signature         string `json:"signature"`
}

// Response is the response returned from humm for both a CreateKey and Sales Adjustment
type Response struct {
	PurchaseNumber string `json:"x_purchase_number,omitempty"`
	Status         string `json:"x_status,omitempty"`
	Code           string `json:"x_code,omitempty"`
	Message        string `json:"x_message"`
	Key            string `json:"x_key,omitempty"`
	Signature      string `json:"signature"`
}

// SalesAdjustmentPayload holds a request to humm for the ProcessAdjustment
type SalesAdjustmentPayload struct {
	PosTransactionRef string `json:"x_pos_transaction_ref"`
	PurchaseRef       string `json:"x_purchase_ref"`
	MerchantID        string `json:"x_merchant_id"`
	Amount            string `json:"x_amount,omitempty"`
	DeviceID          string `json:"x_device_id,omitempty"`
	OperatorID        string `json:"x_operator_id,omitempty"`
	FirmwareVersion   string `json:"x_firmware_version,omitempty"`
	TrackingData      string `json:"tracking_data,omitempty"`
	Signature         string `json:"signature"`
}

// Authenticate validates HMAC
func (r *Response) Authenticate(key string) (bool, error) {
	responsePlainText := GeneratePlainTextSignature(r)

	if len(r.Signature) >= 0 {
		return CheckMAC([]byte(responsePlainText), []byte(r.Signature), []byte(key))
	}
	return false, errors.New("Plaintext is signature is 0 length")
}

// GeneratePlainTextSignature will generate an humm plain text message ready for signing
func GeneratePlainTextSignature(payload interface{}) string {

	var buffer bytes.Buffer

	// create a temporary map so we can sort the keys,
	// go intentionally randomises maps so we need to
	// store the keys in an array which we can sort
	v := reflect.TypeOf(payload).Elem()
	y := reflect.ValueOf(payload)
	if y.IsNil() {
		return ""
	}
	x := y.Elem()

	payloadList := make(map[string]string, x.NumField())

	for i := 0; i < x.NumField(); i++ {
		field := x.Field(i)
		ftype := v.Field(i)

		data := field.Interface()
		tag := ftype.Tag.Get("json")
		idx := strings.Index(tag, ",")
		if idx > 0 {
			tag = tag[:idx]
		}

		payloadList[tag] = data.(string)

	}
	var keys []string
	for k := range payloadList {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	for _, v := range keys {
		// there shouldn't be any nil values
		// Signature needs to be populated with the actual HMAC
		// calld
		if v[0:2] == "x_" && payloadList[v] != "" {
			buffer.WriteString(fmt.Sprintf("%s%s", v, payloadList[v]))
		}
	}
	plainText := buffer.String()
	return plainText
}

// SignMessage will generate an HMAC of the plaintext
func SignMessage(plainText string, signingKey string) string {
	key := []byte(signingKey)
	mac := hmac.New(sha256.New, key)
	mac.Write([]byte(plainText))
	macString := hex.EncodeToString(mac.Sum(nil))
	return macString
}

// CheckMAC used to validate responses from the remote server
func CheckMAC(message []byte, messageMAC []byte, key []byte) (bool, error) {
	mac := hmac.New(sha256.New, key)
	_, err := mac.Write(message)

	expectedMAC := hex.EncodeToString(mac.Sum(nil))

	// we use hmac.Equal because regular equality (i.e == ) is subject to timing attacks
	isGood := hmac.Equal(messageMAC, []byte(expectedMAC))

	return isGood, err
}
func post(w http.ResponseWriter, r *http.Request) {
	fmt.Println("get here")
	url_ := "https://integration-cart.shophumm.com.au/Checkout?platform=Default"
	server := "https://turbo-halibut-jgv69r946rg3qwj4-3333.app.github.dev"
	_key := "9399867A5BC74950"
	method := "POST"

	data := url.Values{}
	data.Set("x_reference", "123")
	data.Set("x_account_id", "30188792")
	data.Set("x_amount", "100.00")
	data.Set("x_currency", "AUD")
	data.Set("x_url_callback", server+"/callback")
	data.Set("x_url_complete", server+"/complete")
	data.Set("x_url_cancel", server+"/cancel")
	data.Set("x_shop_country", "AU")
	data.Set("x_shop_name", "auspacsolar")
	data.Set("x_customer_first_name", "first")
	data.Set("x_customer_last_name", "last")
	data.Set("x_customer_email", "sample")
	data.Set("x_customer_billing_country", "AU")
	data.Set("x_customer_billing_city", "Adelaide")
	data.Set("x_customer_billing_address1", "97%2BPirie")
	data.Set("x_customer_billing_address2", "St")
	data.Set("x_customer_billing_state", "SA")
	data.Set("x_customer_billing_zip", "5000")
	data.Set("x_description", "Sample%2BStore%2B-%2B%25123")
	data.Set("x_test", "TRUE")

	responsePlainText := GeneratePlainTextSignature(data)
	signature := SignMessage(responsePlainText, _key)
	data.Set("x_signature", signature)
	payload := strings.NewReader(data.Encode())
	//"x_reference=123&x_account_id=30188792&x_amount=100.00&x_currency=AUD&x_url_callback=https%3A%2F%2Fauspacsolar.webflow.io%2Fcallback&x_url_complete=https%3A%2F%2Fauspacsolar.webflow.io%2Fcomplete&x_url_cancel=https%3A%2F%2Fauspacsolar.webflow.io%2Fcancel&x_shop_country=AU&x_shop_name=auspacsolar&x_customer_first_name=first&x_customer_last_name=&x_customer_email=sample%2540email.com&x_customer_billing_country=AU&x_customer_billing_city=Adelaide&x_customer_billing_address1=97%2BPirie&x_customer_billing_address2=St&x_customer_billing_state=SA&x_customer_billing_zip=5000&x_description=Sample%2BStore%2B-%2B%25123&x_signature=dummy_signature&x_test=true")

	client := &http.Client{}
	req, err := http.NewRequest(method, url_, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	//req.Header.Add("Cookie", "hummueid=1f3db888-321a-4c51-87fb-dcc2677b87ec")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
	io.WriteString(w, string(body))
}

func getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got / callback request\n")
	io.WriteString(w, "call back!\n")
}
func getHello(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got /complete request\n")
	io.WriteString(w, "conmplete, HTTP!\n")
}
func getCancel(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got /cancel request\n")
	io.WriteString(w, "cancel, HTTP!\n")
}
func main() {
	http.HandleFunc("/callback", getRoot)
	http.HandleFunc("/complete", getHello)
	http.HandleFunc("/cancel", getCancel)
	http.HandleFunc("/checkout", post)

	err := http.ListenAndServe(":3333", nil)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}

}
