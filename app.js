"use strict";

window.Webflow ||= [];
window.Webflow.push(() => {  
	alert("hello world");
	console.log("hello world");
});
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    console.log('cmsload Successfully loaded!');

    // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
    const [listInstance] = listInstances;

    // The `renderitems` event runs whenever the list renders items after switching pages.
    listInstance.on('renderitems', (renderedItems) => {
      console.log(renderedItems);
    });
  },
]);
// Store important elements
// const cmsFilter = document.querySelector("[data-cms-filter]");
// const cmsFilterLinks = Array.from(
//   cmsFilter.querySelectorAll("[data-cms-filter-links] a")
// );
// const cmsFilterItems = Array.from(
//   cmsFilter.querySelectorAll("[data-category]")
// );
 
// // create event to be used later
// const filterEvent = new Event("filter");
 
// // GSAP timeline to fade in CMS items
// const tl = gsap.timeline();
// tl.from(cmsFilterItems, {
//   y: 50,
//   autoAlpha: 0,
//   stagger: 0.05,
// });
 
// // loop through each link and add a click to it
// cmsFilterLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     const chosenCategory = e.currentTarget.hash.substring(1);
 
//     // on each click, loop through cms items and determine if their category is the one we clicked
//     cmsFilterItems.forEach((item) => {
// 		console.log(item);
//       if (
//         chosenCategory === item.dataset.category ||
//         chosenCategory === "reset"
//       ) {
//         item.style.display = "block";
//       } else {
//         item.style.display = "none";
//       }
//     });
 
//     // dispatch a 'fliter' event
//     cmsFilter.dispatchEvent(filterEvent);
//   });
// });
 
// // listen for a 'filter' event on the cmsFliter element and restart the gsap timeline
// cmsFilter.addEventListener("filter", () => {
//   tl.restart();
// });