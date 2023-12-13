function init(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
init();

let cursor = document.querySelector(".cursor")
let main = document.querySelector(".main")
let purple = document.querySelector(".purple")
let navlinks = document.querySelectorAll(".nav-center a")
let video = document.querySelectorAll("video")
let img = document.querySelectorAll("img")
let h1 = document.querySelectorAll(".purple h1")



let menu = document.querySelectorAll(".circlemenu")
let circle = document.getElementById("btnId")
let open = false


circle.addEventListener("click", function(){
  if (!open) {
    gsap.to(menu, {
      opacity: 1
    })
    open = true
  } else {
    gsap.to(menu, {
      opacity: 0
    })
    open = false
  }
})

const activePage = window.location.pathname;
let secondlinks = document.querySelectorAll(".circlemenu a")

console.log(activePage);


navlinks.forEach(function(e){
  if (e.href.includes(`${activePage}`)) {
    e.classList.add("active")
  }
})
secondlinks.forEach(function(e){
  if (e.href.includes(`${activePage}`)) {
    e.classList.add("secondactive")
  }
})



document.addEventListener("mousemove", function (dets){
  cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
})

navlinks.forEach(function (elem) {
  elem.addEventListener("mousemove", function(){
    cursor.style.display = "none"
    h1.forEach(function(element){
      element.textContent = `${elem.textContent}`
    })
    purple.style.display = "block"
    purple.style.opacity = "1"
  })
  elem.addEventListener("mouseleave", function(){
    cursor.style.display = "block"
    h1.forEach(function(element){
      element.textContent = ``
    })
    purple.style.display = "none"
    purple.style.opacity = "0"
  })
});


// gsap.to(".heading1 h1, .heading2 h2",{
//   y: 0,
//   opacity: 1,
//   duration: 0.8,
//   rotate: 0
// })

let tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".sec1 h1",
        scroller: ".main",
        // markers: true,
        start: "top 30%",
        end: "top 0",
        scrub: 3
    }
})

// tl.to(".head1 h1",{
//     x: -150
// },"anim")

// tl.to(".head2 h2",{
//     x: 150
// },"anim")
tl.to(".sec1 video",{
    width:"90%"
},"anim")

let tl2 = gsap.timeline({
  scrollTrigger:{
      trigger: ".sec1 h1",
      scroller: ".main",
      // markers: true,
      start: "top -100%",
      end: "top -120%",
      scrub: 3
  }
})
tl2.to(".main", {
  backgroundColor: "#fff"
})

let tl3 = gsap.timeline({
  scrollTrigger:{
      trigger: ".sec4",
      scroller: ".main",
      // markers: true,
      start: "top 40%",
      end: "top 60%",
      scrub: 3
  }
})

tl3.to(".main",{
  backgroundColor: "#111"
})

//image Effects

document.querySelectorAll(".element").forEach(function(elem) {

  var rotateinit = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets){
    cursor.style.display = "block"
      gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Expo.easeInOut
      })
  })

  elem.addEventListener("mousemove", function (dets){
      cursor.style.display = "none"
      let diff = dets.clientY - elem.getBoundingClientRect().top

      diffrot = dets.clientX - rotateinit
      rotateinit = dets.clientX;
      
      console.log(diffrot);
      

      gsap.to(elem.querySelector("img"), {
          opacity: 1,
          top: diff,
          left: dets.clientX,
          ease: Power3
      })
  })

  
})



video.forEach(function(elem){
  elem.addEventListener("mouseenter", function(){
    gsap.to(".cursor",{
      width: "80px",
      borderRadius: "50px"
    })
    cursor.textContent = "Sound on"
  })
  elem.addEventListener("mouseleave", function(){
    cursor.textContent = ""
    gsap.to(".cursor",{
      width: "20px",
      borderRadius: "50%"
    })
  })
})

img.forEach(function(elem){
  elem.addEventListener("mouseenter", function(){
    gsap.to(".cursor",{
      width: "80px",
      borderRadius: "50px",
      color: "white"
    })
    cursor.textContent = "view"
  })
  elem.addEventListener("mouseleave", function(){
    cursor.textContent = ""
    gsap.to(".cursor",{
      width: "20px",
      borderRadius: "50%"
    })
  })
})


gsap.to(".title1 h1, .title2 h1", {
  y: 0,
  duration: 0.5,
  rotate: 0
})


// Magnet Effect

// function magneticButton (element){
//   const children = element.children[0]

//   element.addEventListener("mousemove", e =>{
//     const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = element

//     const left = e.pageX - offsetLeft
//     const top = e.pageY - offsetTop
//     const centerX = left - offsetWidth / 2
//     const centerY = top - offsetHeight / 2

//     const d = Math.sqrt(centerX**2 + centerY**2)

//       gsap.to(element, 0.5, {
//         x: centerX / 1.7,
//         y: centerY / 1.7,
//         ease: Elastic.easeOut
//       })
//       cursor.style.display ="none"
//       children.style.transform = `translate3d(${centerX/4}px, ${centerY/4}px, 0) rotate3d(${-centerY/ 100}, ${-centerX /100}, 0, ${d/5}deg)`

//   })
//   element.addEventListener("mouseleave", e=>{
//      element.style.transform = ''
//      cursor.style.display ="block"
//      gsap.to(element, 1.2, {
//       x: 0,
//       y: 0,
//       ease: Elastic.easeOut.config(1.5, 0.2)
//     })

//      children.style.transform = ''
//   })
// }

// const a = document.querySelector(".footer-top a")
// magneticButton(a)

const magnetarea = document.querySelector(".magnetarea")
const a = document.querySelector(".footer-top a")

magnetarea.addEventListener("mousemove",(dets)=>{
  cursor.style.display="none"
  const boundingRect = magnetarea.getBoundingClientRect()

  const x = dets.pageX - boundingRect.left - boundingRect.width 
  const y = dets.pageY - boundingRect.top - boundingRect.height
  a.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`
})
magnetarea.addEventListener("mouseleave",()=>{
  a.style.transform = ''
  cursor.style.display="block"
})