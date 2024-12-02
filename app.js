"use strict";

window.Webflow ||= [];
window.Webflow.push(() => {
  alert("hello world");
  console.log("hello world");

  // Your code goes here
  $(document).ready(function () {
    // Set default
    document.querySelectorAll(".paragraph-desc-selection").forEach((item) => {
      item.style.display = "none";
    });
    // Hide all check mark
    $(".check-mark").hide();
    // Only show inverter
    document.querySelectorAll(".cms-item")?.forEach((i) => {
      if (
        i.querySelectorAll(".heading_product")[0].innerText ==
        "BLUETTI AC500 + B300s"
      ) {
        i.style.display = "inline-block";
      } else {
        i.style.display = "none";
      }
    });

    // Dynamic selection

    let i_selection = document.querySelectorAll(".inverter-selection");
    for (let i = 0; i < i_selection.length; i++) {
      console.log(i);
      i_selection[i].addEventListener("click", (e) => {
        console.log(e.target.innerText);

        // show check -mark
        console.log(i);
        document.querySelectorAll(".check-mark")[i].style.display =
          "inline-block";

        //paragraph-desc-selection
        console.log(
          document
            .querySelectorAll(".paragraph-desc-selection")
            [i].checkVisibility()
        );
        document.querySelectorAll(".paragraph-desc-selection")[
          i
        ].style.display = "inline-block";

        document.querySelectorAll(".cms-item")?.forEach((i) => {
          if (
            i.querySelectorAll(".heading_product")[0].innerText ===
            e.target.innerText
          ) {
            i.style.display = "inline-block";
          } else {
            i.style.display = "none";
          }
        });
      });
    }

    let p_selection = document.querySelectorAll(".panel-selection");
    for (let i = 0; i < p_selection.length; i++) {
      p_selection[i].addEventListener("click", (e) => {
        console.log(e.target.innerText);
        console.log(p_selection[i]);

        // show check -mark
        document.querySelectorAll(".check-mark")[i].style.display =
          "inline-block";

        //paragraph-desc-selection
        console.log(
          document
            .querySelectorAll(".paragraph-desc-selection")
            [i].checkVisibility()
        );
        document.querySelectorAll(".paragraph-desc-selection")[
          i
        ].style.display = "inline-block";

        document.querySelectorAll(".cms-item")?.forEach((i) => {
          if (
            i.querySelectorAll(".heading_product")[0].innerText ===
            e.target.innerText
          ) {
            i.style.display = "inline-block";
          } else {
            i.style.display = "none";
          }
        });
      });
    }

    let b_selection = document.querySelectorAll(".battery-selection");
    for (let i = 0; i < b_selection.length; i++) {
      b_selection[i].addEventListener("click", (e) => {
        console.log(e.target.innerText);

        // show check -mark
        document.querySelectorAll(".check-mark")[i].style.display =
          "inline-block";

        //paragraph-desc-selection
        console.log(
          document
            .querySelectorAll(".paragraph-desc-selection")
            [i].checkVisibility()
        );
        document.querySelectorAll(".paragraph-desc-selection")[
          i
        ].style.display = "inline-block";

        document.querySelectorAll(".cms-item")?.forEach((i) => {
          if (
            i.querySelectorAll(".heading_product")[0].innerText ===
            e.target.innerText
          ) {
            i.style.display = "inline-block";
          } else {
            i.style.display = "none";
          }
        });
      });
    }
  });
});

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsload",
  (listInstances) => {
    console.log("cmsload Successfully loaded!", listInstances);

    // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
    const [listInstance] = listInstances;
  },
]);
