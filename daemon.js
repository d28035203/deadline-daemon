/**
 * panic.js — deadline project countdown (2019)
 */
(function () {
 var TASKS = [
 "Finalize project title (again)",
 "Make guide believe the demo works",
 "Fix the one bug that only appears in the lab",
 "Write report that sounds longer than the code",
 "Print hard-bound copies nobody will read",
 "Practice viva answers in the mirror",
 ];

 var list = document.getElementById("list");
 var saved = JSON.parse(localStorage.getItem("deadline_checks") || "{}");

 TASKS.forEach(function (t, i) {
 var li = document.createElement("li");
 var id = "t" + i;
 li.innerHTML =
 '<label><input type="checkbox" id="' + id + '" ' +
 (saved[id] ? "checked" : "") +
 "/> " + t + "</label>";
 list.appendChild(li);
 li.querySelector("input").addEventListener("change", function (e) {
 saved[id] = e.target.checked;
 localStorage.setItem("deadline_checks", JSON.stringify(saved));
 mood();
 });
 });

 function mood() {
 var n = Object.keys(saved).filter(function (k) { return saved[k]; }).length;
 var el = document.getElementById("mood");
 if (n === 0) el.textContent = "Status: pure denial.";
 else if (n < 3) el.textContent = "Status: mild sweating.";
 else if (n < 6) el.textContent = "Status: productive panic.";
 else el.textContent = "Status: theoretically ready. Practically terrified.";
 }

 function tick() {
 var d = document.getElementById("deadline").value;
 var end = new Date(d + "T23:59:59");
 var ms = end - new Date();
 var days = Math.ceil(ms / 86400000);
 document.getElementById("days").textContent =
 days < 0 ? "OVERDUE (" + (-days) + " days ago)" : String(days);
 }

 document.getElementById("deadline").addEventListener("change", tick);
 tick();
 mood();
 setInterval(tick, 60000);
})();
