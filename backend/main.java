import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.binary.Base64;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

class Main
{
    private static final String _merchantId = "<insert your merchantId here>";
    private static final String _key = "<insert your key here>";
    private static final String _hashAlgorithm = "HmacSHA256";

    public static void main(String[] args) {

        HashMap<String, String>  map = new HashMap<String, String>();

        map.put("x_url_callback", "http://example.com/payments/humm/process");
        map.put("x_url_cancel", "http://example.com/payments/humm/cancel");
        map.put("x_url_complete", "http://example.com/payments/humm/process");
        map.put("x_account_id", _merchantId);
        map.put("x_amount", "400.00");
        map.put("x_currency", "AUD");
        map.put("x_reference", "TestOrder1");
        map.put("x_shop_country", "AU");
        map.put("x_shop_name", "Humm Mugs");
        map.put("x_test", "false");

        String plainText = signatureGeneration(_key, map);

        System.out.println("Plain Text: " + plainText);

        // generate the HMAC
        String hmac = signMessage(plainText, _key);

        System.out.println("HMAC " + hmac);
    }

    public static String signatureGeneration(String gatewayKey, HashMap apiArgs) {
        String[] stringArray = Arrays.copyOf(apiArgs.keySet().toArray(), apiArgs.size(), String[].class);
        List<String> keys = Arrays.asList(stringArray);

        // Sort the List
        try {
            Collections.sort(keys);
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }

        String plainText = "";
        for(String key : keys){
            plainText += (key + apiArgs.get(key));
        }

        return  plainText;
    }

    private static String signMessage(String plainText, String key){
        String signature = "";
        try {
            Mac hmac = Mac.getInstance(_hashAlgorithm);
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes("UTF-8"), _hashAlgorithm);

            hmac.init(secretKey);
            signature = Hex.encodeHexString(hmac.doFinal(plainText.getBytes("UTF-8")));

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
             System.out.format("You do not have the %s libraries installed", _hashAlgorithm);
        }
        return signature;
    }
}