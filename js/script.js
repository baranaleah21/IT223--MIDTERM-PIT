// ── PROMPT GREETING ────
var username = prompt("To address you better, may I know your name?");
if (username && username.trim() !== "") {
  document.getElementById("greeting").textContent = "Welcome, " + username + "!";
}

// ── SKILL TAG CLICK → SHOW INDIVIDUAL BAR ───
var skillTags  = document.querySelectorAll("#skills ul li");
var skillItems = document.querySelectorAll(".skill-item");
var allBarsVisible = false;

skillTags.forEach(function(tag, index) {
  tag.addEventListener("click", function() {

    if (allBarsVisible) {
      allBarsVisible = false;
      document.getElementById("show-bars-btn").textContent = "Show Skill Levels";
      skillItems.forEach(function(item) {
        item.classList.remove("visible");
        item.querySelector(".fillbar").style.width = "0%";
      });
      skillTags.forEach(function(t) { t.classList.remove("active-skill"); });
    }

    var isAlreadyActive = tag.classList.contains("active-skill");

    skillTags.forEach(function(t) { t.classList.remove("active-skill"); });
    skillItems.forEach(function(item) {
      item.classList.remove("visible");
      item.querySelector(".fillbar").style.width = "0%";
    });

    if (!isAlreadyActive) {
      tag.classList.add("active-skill");
      var targetItem = skillItems[index];
      if (targetItem) {
        targetItem.classList.add("visible");
        setTimeout(function() {
          var fill = targetItem.querySelector(".fillbar");
          fill.style.width = fill.dataset.width + "%";
        }, 50);
      }
    }
  });
});

// ── SHOW ALL SKILL LEVELS BUTTON ────
document.getElementById("show-bars-btn").addEventListener("click", function() {
  allBarsVisible = !allBarsVisible;

  skillTags.forEach(function(t) { t.classList.remove("active-skill"); });

  if (allBarsVisible) {
    this.textContent = "Hide Skill Levels";
    skillItems.forEach(function(item) { item.classList.add("visible"); });
    setTimeout(function() {
      document.querySelectorAll(".fillbar").forEach(function(bar) {
        bar.style.width = bar.dataset.width + "%";
      });
    }, 50);
  } else {
    this.textContent = "Show Skill Levels";
    skillItems.forEach(function(item) {
      item.classList.remove("visible");
      item.querySelector(".fillbar").style.width = "0%";
    });
  }
});

// ── CONTACT FORM VALIDATION ───
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  var valid = true;
  var nameField  = document.getElementById("contact_name");
  var emailField = document.getElementById("contact_email");
  var msgField   = document.getElementById("contact_message");

  document.getElementById("error_name").style.display    = "none";
  document.getElementById("error_email").style.display   = "none";
  document.getElementById("error_message").style.display = "none";
  document.getElementById("form-success").style.display  = "none";

  if (nameField.value.trim() === "") {
    document.getElementById("error_name").style.display = "block";
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    document.getElementById("error_email").style.display = "block";
    valid = false;
  }
  if (msgField.value.trim() === "") {
    document.getElementById("error_message").style.display = "block";
    valid = false;
  }
  if (valid) {
    document.getElementById("form-success").style.display = "block";
    this.reset();
  }
});

// ── JQUERY: DARK MODE + PROJECT FILTER ───
$(document).ready(function() {

  // Dark mode toggle
  $("#dark-toggle").on("click", function() {
    $("body").toggleClass("dark");
    $(this).text($("body").hasClass("dark") ? "Light Mode" : "Dark Mode");
  });


  $(".btn").on("click", function() {
    $(".btn").removeClass("active");
    $(this).addClass("active");

    var filter = $(this).data("filter");

    $("#projects div[data-type]").each(function() {
      var type = $(this).data("type");
      if (filter === "all" || type === filter) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

});