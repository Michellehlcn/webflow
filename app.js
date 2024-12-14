"use strict";

window.Webflow ||= [];
window.Webflow.push(() => {
  alert("hello world");
  console.log("hello world");

  // Your code goes here
  $(document).ready(function () {
    
    const paymentData = {
      amount: 100.00, // Set the amount dynamically
      currency: 'AUD' // Set your currency
    };
    
    document.getElementById('humm-pay-button').addEventListener('click', function() {
      fetch('https://turbo-halibut-jgv69r946rg3qwj4-3333.app.github.dev/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.paymentUrl) {
          // Redirect user to the Humm payment page
          window.location.href = data.paymentUrl;
        } else {
          alert('Payment initiation failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      });
    });


    //////////////////////////
  //   // Set default - Hide arrow
  //   document.querySelectorAll(".arrow-to-product").forEach((item) => {
  //     item.style.display = "none";
  //   });
    
  //   // Hover | Arrow pop up
  //   let selection = document.querySelectorAll(".collection-item-15");
  //   for (let i = 0; i < selection.length; i++) {
  //     console.log(selection[i]);
     	
  //     selection[i].addEventListener("mouseover", funcMouseover, false);
  //     selection[i].addEventListener("mouseout", funcMouseout, false);

  //     function funcMouseover(){  
  //       selection[i].querySelectorAll(".arrow-to-product").forEach((item) => {
  //         item.style.display ="inline-block";
  //       });
  //     }

  //     function funcMouseout() {  
  //       selection[i].querySelectorAll(".arrow-to-product").forEach((item) => {
  //         item.style.display = "none";
  //       });
  //     }
  //   }
    
  //  // Check box | filter

  //  let batteries = ["BLUETTI B210P Expansion Battery", "BLUETTI B300S Expansion Battery"];
  //  let panels = ["BLUETTI PV350 Solar Panel","BLUETTI MP200 Solar Panel"];
  //  let inverters = ["BLUETTI AC500 + B300s","BLUETTI AC70P Portable Power Station","BLUETTI AC180P Solar Portable Power Station","BLUETTI AC240P Portable Power Station"];
  //  let combo = ["BLUETTI AC500 + B300S + PV350W","BLUETTI AC70P + MP200W","BLUETTI AC70P + MP200W","BLUETTI AC240P + PV350W"];
  //  let acc = ["BLUETTI Aviation Plug","BLUETTI MC4 10M Cable","BLUETTI Folding Trolley","BLUETTI Charger 1"];
   
   
  //  check_box_handle ("panels");
  //  check_box_handle ("inverters");
  //  check_box_handle ("batteries");
  //  check_box_handle ("combo");
  //  check_box_handle ("all-products");
  //  check_box_handle ("in-stock");
  //  check_box_handle ("accessories");

  // function matchKeywords (key_search) {
  //  for (let i = 0; i < selection.length; i++) {
  //   selection[i].querySelectorAll(".key-words-search").forEach((item) => {
  //     console.log(item);
  //     let name_product = item?.innerText;

  //     switch (key_search) {
        
  //       case "panels":
  //         if ( !panels.include(name_product) ) {
  //           selection[i].style.display = "none";
  //         } else {
  //           selection[i].style.display = "inline-block";
  //         }
  //         break;

  //       case "inverters":
  //         if ( !inverters.include(name_product) ) {
  //           selection[i].style.display = "none";
  //         } else {
  //           selection[i].style.display = "inline-block";
  //         }
  //         break;

  //       case "batteries":
  //           if ( !batteries.include(name_product) ) {
  //             selection[i].style.display = "none";
  //           } else {
  //             selection[i].style.display = "inline-block";
  //           }
  //           break;
        
  //       case "combo":
  //         if ( !combo.include(name_product) ) {
  //           selection[i].style.display = "none";
  //         } else {
  //           selection[i].style.display = "inline-block";
  //         }
  //         break;
        
  //         case "accessories":
  //           if ( !acc.include(name_product) ) {
  //             selection[i].style.display = "none";
  //           } else {
  //             selection[i].style.display = "inline-block";
  //           }
  //           break;

  //         default:
  //           selection[i].style.display =  "inline-block";
  //           break;
  //     }
  //   });
  //  }
  // }

  //  function check_box_handle (key_search){
  //  let checkbox = document.querySelector(`input[name=${key_search}]`);
  //  checkbox.addEventListener('change', function() {
  //    if (this.checked) {
  //      console.log("Checkbox is checked..", key_search);
  //      matchKeywords();
       
  //    } else {
  //      console.log("Checkbox is not checked..", key_search);
  //    }
  //  });
  // }

   
  })


  });
