const l = document.getElementById("nav-toggle")
  , d = document.getElementById("nav-close")
  , a = document.getElementById("nav-menu")
  , u = document.querySelectorAll(".nav_link");
function b() {
    a.classList.add("show"),
    document.body.style.overflow = "hidden"
}
function f() {
    a.classList.remove("show"),
    document.body.style.overflow = ""
}
l == null || l.addEventListener("click", b);
d == null || d.addEventListener("click", f);
u.forEach(t => {
    t.addEventListener("click", () => {
        f(),
        u.forEach(e => e.classList.remove("active")),
        t.classList.add("active")
    }
  )
}
);