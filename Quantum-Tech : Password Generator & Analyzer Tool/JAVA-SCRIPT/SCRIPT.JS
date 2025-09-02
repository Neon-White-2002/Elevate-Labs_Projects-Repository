// ***** JAVA-SCRIPT (INDEX-PAGE) *****

// ----- PASSWORD-GENERATOR (SHOW & HIDE) ----- :

// PASSWORD-GENERATOR BUTTON :
const passwordGeneratorButton = document.getElementById("password-generator-button");
// PASSWORD-ANALYZER BUTTON :
const passwordAnalyzerButton = document.getElementById("password-analyzer-button");

// PASSWORD-GENERATOR CONTAINER :
const passwordGeneratorContainer = document.querySelector(".password-generator-container");
// PASSWORD-ANALYZER CONTAINER :
const passwordAnalyzerContainer = document.querySelector(".password-analyzer-container");

// PASSWORD-MENU-CONTAINER : 
const passwordMenuContainer = document.querySelector(".password-menu-container"); 

// PASSWORD-GENERATOR (BACK-BUTTON) :
const passwordGeneratorBackButton = document.querySelector(".password-generator-container .header-text .back-button"); 
// PASSWORD-ANALYZER (BACK-BUTTON) : 
const passwordAnalyzerBackButton = document.querySelector(".password-analyzer-container .header-text .back-button"); 

// EVENT-LISTENER (PASSWORD-GENERATOR BUTTON) :
passwordGeneratorButton.addEventListener("click", () => {
  // HIDE, THE PASSWORD-MENU-CONTAINER :
  passwordMenuContainer.style.display = "none";
  // SHOW, THE PASSWORD-GENERATOR CONTAINER :
  passwordGeneratorContainer.style.display = "flex";
  // UPDATE-BACKGROUND : 
  document.body.style.background = "linear-gradient(135deg, #C562AF, #FEC5F6, #DB8DD0)";
});

// EVENT-LISTENER (PASSWORD-ANALYZER BUTTON) :
passwordAnalyzerButton.addEventListener("click", () => {
  // HIDE, THE PASSWORD-MENU-CONTAINER :
  passwordMenuContainer.style.display = "none";
  // SHOW, THE PASSWORD-ANALYZER CONTAINER :
  passwordAnalyzerContainer.style.display = "flex";
  // UPDATE-BACKGROUND : 
  document.body.style.background = "linear-gradient(135deg, #DED0B6, #BBAB8C, #FAEED1)";
});

// EVENT-LISTENER (PASSWORD-GENERATOR : BACK-BUTTON) : 
passwordGeneratorBackButton.addEventListener("click", () => {
  // SHOW, THE PASSWORD-ANALYZER CONTAINER :
  passwordGeneratorContainer.style.display = "none";
  // HIDE, THE PASSWORD-MENU-CONTAINER :
  passwordMenuContainer.style.display = "flex";
  // UPDATE-BACKGROUND : 
  document.body.style.background = "#F5F5F5";
});

// EVENT-LISTENER (PASSWORD-GENERATOR : BACK-BUTTON) : 
passwordAnalyzerBackButton.addEventListener("click", () => {
  // SHOW, THE PASSWORD-ANALYZER CONTAINER :
  passwordAnalyzerContainer.style.display = "none";
  // HIDE, THE PASSWORD-MENU-CONTAINER :
  passwordMenuContainer.style.display = "flex";
  // UPDATE-BACKGROUND : 
  document.body.style.background = "#F5F5F5";
});

// ----- PASSWORD-GENERATOR (PROGRESS-BAR FOR SLIDER) ----- :

// SLIDER :
const slider = document.querySelector(".password-length input[type='range']");
// FUNCTION (UPDATE SLIDER BACKGROUND) :
function updateSliderBackground(slider) {
  const min = slider.min ? slider.min : 0;
  const max = slider.max ? slider.max : 100;
  const val = ((slider.value - min) / (max - min)) * 100;

  slider.style.backgroundSize = val + "% 100%";
}

// INITIALIZATION :
updateSliderBackground(slider);
// UPDATE ON INPUT (SLIDER) : 
slider.addEventListener("input", () => updateSliderBackground(slider));


// ----- GENERATE-RANDOM (PASSWORD'S) ----- :

// GENERATE-BUTTON :
const passwordGenerateButton = document.querySelector(".password-generate-button");
// RANDOM-PASSWORD (INPUT-BOX) :
const passwordInputBox = document.querySelector(".input-box input");
// COPY-BUTTON : 
const copyButton = document.querySelector(".input-box .copy-button");
// ALTER-MESSAGE : 
const alterMessage = document.querySelector(".input-box .alter-message");
// OPTIONS-BUTTONS : 
const options = document.querySelectorAll(".password-settings .options .option input");
// PASSWORD-LENGTH (SLIDER) :
const passwordLengthSlider = document.querySelector(".password-length input");
// PASSWORD-INDICATOR : 
const passwordIndicator = document.querySelector(".password-indicator");

// CHARACTER-SETS : 
const characterSets = {
  lower_case: "abcdefghijklmnopqrstuvwxyz",
  upper_case: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
}

// GENERATE-PASSWORD (FUNCTION) :
const generatePassword = () => {
  // CREATING, A VARIABLE (TO STORE THE PASSWORD) :
  let staticPassword = "",
  // RANDOM-PASSWORD (VARIBALE) : 
  randomPassword = "",
  // EX-CLUDE-DUPLICATE'S (VARIABLE) :
  excludeDuplicate = false,
  // GETTING, THE PASSWORD-LENGTH (FROM THE SLIDER) :
  passwordLength = passwordLengthSlider.value;
  
  // CHECKING, ALL CHECK-BOX (LOOPING) : 
  options.forEach(option => {
    // CHECKING, IF ANY CHECK-BOX IS CHECKED :
    if (option.checked) {
      // EXCLUDING, THE "EX-CLUDE-DUPLICATE'S" & "SPACES" OPTIONS :
      if (option.id !== "exclude_duplicate" && option.id !== "spaces") {
        // STORE, THE CHARACTER-SET (IN THE VARIABLE) :
        staticPassword += characterSets[option.id];
      }
      // EXCLUDING, THE "EX-CLUDE-DUPLICATE'S" OPTION :
      else if (option.id === "spaces") {
        // STORE, THE CHARACTER-SET (IN THE VARIABLE) :
        staticPassword += ` ${staticPassword}  `;
      }
      else {
        // EX-CLUDE-DUPLICATE'S (TRUE) :
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passwordLength; i++) {
    // GETTING, A RANDOM CHARACTER FROM THE "staticPassword" VARIABLE :
    let randomCharacter = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    // IF "EX-CLUDE-DUPLICATE'S" IS TRUE :
    if (excludeDuplicate) {
      // IF "randomPassword" DOESN'T CONTAIN THE "randomCharacter" OR "randomCharacter" IS A SPACE :
      !randomPassword.includes(randomCharacter) || randomCharacter == " " ? randomPassword += randomCharacter : i--;
    }
    else {
      // ADDING, THE "randomCharacter" TO THE "randomPassword" VARIABLE :
      randomPassword += randomCharacter;
    }
  }

  // SETTING, THE "randomPassword" AS THE VALUE OF THE "passwordInputBox" INPUT :
  alterMessage.style.fontSize = "0.85rem";
  alterMessage.style.top = "0%";
  alterMessage.style.color = "#333";
  alterMessage.style.fontWeight = "700";
  alterMessage.innerHTML = "PASSWORD, GENERATED !";
  // SET, THE "randomPassword" AS THE VALUE OF THE "passwordInputBox" INPUT :
  passwordInputBox.value = randomPassword;

  // UPDATE PASSWORD-INDICATOR (FUNCTION) :
  updatePasswordIndicator();
}

// ----- UPDATE-PASSWORD-INDICATOR (FUNCTION) ----- :
const updatePasswordIndicator = () => {
  // IF THE SLIDER-VALUE IS LESS THAN OR EQUAL TO 8 :
  // THE PASSWORD-INDICATOR ID, WILL BE "weak" :
  // IF THE SLIDER-VALUE IS LESS THAN OR EQUAL TO 16 :
  passwordIndicator.id = passwordLengthSlider.value <= 10 ? "weak" : passwordLengthSlider.value <= 20 ? "medium" : "strong";
}

// ----- UPDAET-SLIDER (FUNCTION) ----- : 
const updateSlider = () => {
  // UPDATE SLIDER-VALUE (TEXT) : 
  document.querySelector(".password-length .details span").innerText = passwordLengthSlider.value;
  // GENERATE-PASSWORD (FUNCTION) :
  generatePassword();
  // UPDATE PASSWORD-INDICATOR (FUNCTION) :
  updatePasswordIndicator();
}

// ----- COPY-PASSWORD (FUNCTION) ----- :
const copyPassword = () => {
  // ICON :
  const icon = copyButton.querySelector("i.fa-copy");
  // IF THE "passwordInputBox" IS EMPTY :
  if (passwordInputBox.value === "") {
    // ALTER-MESSAGE (EMPTY) :
    alterMessage.style.fontSize = "0.85rem";
    alterMessage.style.top = "0%";
    alterMessage.innerHTML = "NOTHING TO, COPY !";
    alterMessage.style.fontWeight = "700";
    alterMessage.style.color = "#FF3E36";

    // CHANGE-ICON (COPIED) :
    icon.classList.replace("fa-copy", "fa-file-circle-xmark");
    icon.style.color = "#FF3E36";

    // ALTER-MESSAGE (TIMEOUT) :
    setTimeout(() => {
      // ALTER-MESSAGE (PASSWORD-GENERATED) :
      alterMessage.style.fontSize = "0.85rem";
      alterMessage.style.top = "0%";
      alterMessage.style.color = "#333";
      alterMessage.style.fontWeight = "700";
      alterMessage.innerHTML = "NONE-PASSWORD, GENERATED !";

      // CHANGE-ICON (COPY) :
      icon.classList.replace("fa-file-circle-xmark", "fa-copy");
      icon.style.color = "#333";
    }, 3500);
  }
  else {
    // COPY, THE PASSWORD : 
    navigator.clipboard.writeText(passwordInputBox.value);
    // ALTER-MESSAGE (COPIED) :
    alterMessage.style.fontSize = "0.85rem";
    alterMessage.style.top = "0%";
    alterMessage.style.color = "#4CD137";
    alterMessage.style.fontWeight = "700";
    alterMessage.innerHTML = "COPIED TO, CLIPBOARD !";

    // CHANGE-ICON (COPIED) :
    icon.classList.replace("fa-copy", "fa-clipboard-check");
    icon.style.color = "#4CD137";

    // ALTER-MESSAGE (TIMEOUT) :
    setTimeout(() => {
      // ALTER-MESSAGE (PASSWORD-GENERATED) :
      alterMessage.style.fontSize = "0.85rem";
      alterMessage.style.top = "0%";
      alterMessage.innerHTML = "PASSWORD, GENERATED !";
      alterMessage.style.color = "#333";
      alterMessage.style.fontWeight = "700";

      // CHANGE-ICON (COPY) :
      icon.classList.replace("fa-clipboard-check", "fa-copy");
      icon.style.color = "#333";
    }, 3500);
  }
}

// EVENT-LISTENER (SLIDER) :
passwordLengthSlider.addEventListener("input", updateSlider);
// EVENT-LISTENER (GENERATE-BUTTON) :
passwordGenerateButton.addEventListener("click", generatePassword);
// EVENT-LISTENER (COPY-BUTTON) :
copyButton.addEventListener("click", copyPassword);


// ---------- PASSWORD-ANALYZER ---------- :

// PASSWORD-ANALYZER INPUT-BOX :
const passwordAnalyzerInputBox = document.querySelector(".password-analyzer-container .input-box input");
// PASSWORD SHOW-BUTTON :
const passwordShowButton = document.querySelector(".password-analyzer-container .input-box .copy-button");
// ALERT-MESSAGE :
const passwordAnalyzerAlterMessage = document.querySelector(".password-analyzer-container .input-box .alter-message");
// PASSWORD-ANALYZE-BUTTON : 
const passwordAnalyzingButton = document.querySelector(".password-analyzing-button");

// EVENT-LISTENER (PASSWORD-ANALYZER INPUT-BOX) :
passwordAnalyzerInputBox.addEventListener("keyup", () => {
  // CHECK, (INPUT-BOX) IS EMPTY OR NOT :
  if(passwordAnalyzerInputBox.value === "") {
    passwordAnalyzerAlterMessage.style.fontSize = "0.95rem";
    passwordAnalyzerAlterMessage.style.top = "50%";
    passwordAnalyzerAlterMessage.innerHTML = "ENTER YOUR, PASSWORD !";
    passwordAnalyzerAlterMessage.style.fontWeight = "500";
    passwordAnalyzerAlterMessage.style.color = "#C4C4C4";
  }
  else {
    // ALTER-MESSAGE (YOUR-PASSWORD) :
    passwordAnalyzerAlterMessage.style.fontSize = "0.85rem";
    passwordAnalyzerAlterMessage.style.top = "0%";
    passwordAnalyzerAlterMessage.style.color = "#333";
    passwordAnalyzerAlterMessage.style.fontWeight = "700";
    passwordAnalyzerAlterMessage.innerHTML = "YOUR, PASSWORD !";
  }
});

// EVENT-LISTENER (PASSWORD-SHOW BUTTON) :
passwordShowButton.addEventListener("click", () => {
  // ICON : 
  const icon = passwordShowButton.querySelector("i");
  // IF THE PASSWORD-ANALYZER INPUT-BOX TYPE IS "password" :
  if (passwordAnalyzerInputBox.type === "password") {
    // TOGGLE, THE TYPE TO "text" :
    passwordAnalyzerInputBox.type = "text";
    // CHANGE-ICON (EYE) :
    icon.classList.replace("fa-eye", "fa-eye-slash");
  }
  else if (passwordAnalyzerInputBox.type === "text") {
    // TOGGLE, THE TYPE TO "text" :
    passwordAnalyzerInputBox.type = "password";
    // CHANGE-ICON (EYE) :
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
});

// EVENT-LISTENER (PASSWORD-ANALYZE BUTTON) :
passwordAnalyzingButton.addEventListener("click", () => {
  // CHECK, (INPUT-BOX) IS EMPTY OR NOT :
  if(passwordAnalyzerInputBox.value === "") {
    passwordAnalyzerAlterMessage.style.fontSize = "0.95rem";
    passwordAnalyzerAlterMessage.style.top = "50%";
    passwordAnalyzerAlterMessage.style.color = "#FF3E36";
    passwordAnalyzerAlterMessage.style.fontWeight = "700";
    passwordAnalyzerAlterMessage.innerHTML = "PLEASE PROVIDE AN, PASSWORD !";

    // TIMEOUT :
    setTimeout(() => {
      passwordAnalyzerAlterMessage.style.fontSize = "0.95rem";
      passwordAnalyzerAlterMessage.style.top = "50%";
      passwordAnalyzerAlterMessage.style.color = "#C4C4C4";
      passwordAnalyzerAlterMessage.style.fontWeight = "500";
      passwordAnalyzerAlterMessage.innerHTML = "ENTER YOUR, PASSWORD !";
    }, 5000);
  }
  else {
    // UPDATE, PASSWORD-SETTINGS : 
    const passwordSettings = document.querySelector(".password-analyzer-container .wrapper .password-settings");
    // PASSWORD-INDICATOR (PASSWORD - STRENGTH) : 
    const passwordIndicator = document.querySelector(".password-analyzer-container .wrapper .password-indicator");

    // CLASS-LIST (MESSAGE) : 
    let lower_case_condition = "",
    upper_case_condition = "",
    number_condition = "",
    symbol_condition = "",
    password_length_condition = "",
    spaces_condition = "";

    // CHECK, PASSWORD-LENGTH : 
    if (passwordAnalyzerInputBox.value.length <= 10) {
      password_length_condition = "weak";
    }
    else if (passwordAnalyzerInputBox.value.length <= 15) {
      password_length_condition = "medium";
    }
    else {
      password_length_condition = "strong";
    }

    // CHECK, LOWER-CASE :
    if (/[a-z]/.test(passwordAnalyzerInputBox.value)) {
      lower_case_condition = true;
    }
    else {
      lower_case_condition = false;
    }

    // CHECK, UPPER-CASE :
    if (/[A-Z]/.test(passwordAnalyzerInputBox.value)) {
      upper_case_condition = true;
    }
    else {
      upper_case_condition = false;
    }

    // CHECK, NUMBER :
    if (/[0-9]/.test(passwordAnalyzerInputBox.value)) {
      number_condition = true;
    }
    else {
      number_condition = false;
    }

    // CHECK, SYMBOL :
    if (/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(passwordAnalyzerInputBox.value)) {
      symbol_condition = true;
    }
    else {
      symbol_condition = false;
    }

    // CHECK, SPACES : 
    if (passwordAnalyzerInputBox.value.includes(" ")) {
      spaces_condition = true;
    }
    else {
      spaces_condition = false;
    }

    // CLASS-LIST (VARIBALE) - MESSAGE : 
    let lowerCaseText = "",
    upperCaseText = "",
    numbersText = "",
    symbolsText = "",
    spacesText = "";

    // UPDATE, PASSWORD-LENGTH (TEXT) : 
    if (password_length_condition === "weak") {
      passwordIndicator.id = "weak";
    }
    else if (password_length_condition === "medium") {
      passwordIndicator.id = "medium";
    }
    else {
      passwordIndicator.id = "strong";
    }

    // UPDATE, LOWER-CASE (TEXT) : 
    if (lower_case_condition == true) {
      lowerCaseText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          
          <label for="lower_case" class="condition-yes">Lower-Case (a-z)</label>
        </li>
      `;
    }
    else {
      lowerCaseText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-xmark"></i>
          </div>
            
          <label for="lower_case" class="condition-no">Lower-Case (a-z)</label>
        </li>
      `;
    }

    // UPDATE, UPPER-CASE (TEXT) : 
    if (upper_case_condition == true) {
      upperCaseText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          
          <label for="upper_case" class="condition-yes">Upper-Case (A-Z)</label>
        </li>
      `;
    }
    else {
      upperCaseText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-xmark"></i>
          </div>
            
          <label for="upper_case" class="condition-no">Upper-Case (A-Z)</label>
        </li>
      `;
    }

    // UPDATE, NUMBERS (TEXT) : 
    if (number_condition == true) {
      numbersText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          
          <label for="numbers" class="condition-yes">Number's (0-9)</label>
        </li>
      `;
    }
    else {
      numbersText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-xmark"></i>
          </div>
            
          <label for="numbers" class="condition-no">Number's (0-9)</label>
        </li>
      `;
    }

    // UPDATE, SYMBOLS (TEXT) : 
    if (symbol_condition == true) {
      symbolsText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          
          <label for="symbols" class="condition-yes">Symbol's (!@#$%^&*)</label>
        </li>
      `;
    }
    else {
      symbolsText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-xmark"></i>
          </div>
            
          <label for="symbols" class="condition-no">Symbol's (!@#$%^&*)</label>
        </li>
      `;
    }

    // UPDATE, SPACES (TEXT) : 
    if (spaces_condition == true) {
      spacesText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          
          <label for="spaces" class="condition-yes">Space's</label>
        </li>
      `;
    }
    else {
      spacesText = `
        <!-- OPTION -->
        <li class="option">
          <div class="condition-icon">
            <i class="fa-regular fa-circle-xmark"></i>
          </div>
            
          <label for="spaces" class="condition-no">Space's</label>
        </li>
      `;
    }

    // UPDATE, PASSWORD-SETTING'S (MENU) : 
    passwordSettings.innerHTML = `
      <!-- PASSWORD-SETTINGS -->
      <label for="" class="title"># PASSWORD-SETTINGS :</label>
      
      <!-- PASSWORD-SETTINGS (OPTIONS) -->
      <ul class="options">
        <!-- LOWER-CASE -->
        ${lowerCaseText}
        <!-- UPPER-CASE -->
        ${upperCaseText}
        <!-- NUMBERS -->
        ${numbersText}
        <!-- SYMBOLS -->
        ${symbolsText}
        <!-- SPACES -->
        ${spacesText}
      </ul>
    `;
  }
});
