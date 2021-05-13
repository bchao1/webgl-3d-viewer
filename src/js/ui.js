transformValueDivs = [];
transformValues = [];

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
}

function initControls(i){
    console.log("Init controls!");
    transformValueDivs.push({});
    transformValues.push({});
    controlDiv = document.createElement("div");
    setAttributes(controlDiv, {
        "class": "controls",
        "id": `controls-${i}`
    });
    controlDiv.appendChild(createShaderSelector(i));
    controlDiv.appendChild(createSliderCollection([""], "fov", i));
    controlDiv.appendChild(createSliderCollection([""], "ambient intensity", i));
    controlDiv.appendChild(createSliderCollection([""], "diffuse intensity", i));
    controlDiv.appendChild(createSliderCollection([""], "specular intensity", i));
    controlDiv.appendChild(createSliderCollection([""], "specular order", i));
    controlDiv.appendChild(createSliderCollection(["X", "Y", "Z"], "translate", i));
    controlDiv.appendChild(createSliderCollection(["X", "Y", "Z"], "rotate", i));
    controlDiv.appendChild(createSliderCollection(["Y", "Z"], "shearX", i));
    controlDiv.appendChild(createSliderCollection(["X", "Z"], "shearY", i));
    controlDiv.appendChild(createSliderCollection(["X", "Y"], "shearZ", i));
    controlDiv.appendChild(createSliderCollection(["X", "Y", "Z"], "scale", i));
    if(i > 0) controlDiv.style.display = "none";
    //document.getElementById("toggle-control-btn").addEventListener("click", e => {
    //    if(controlDiv.style.visibility == "visible") controlDiv.style.visibility = "hidden";
    //    else controlDiv.style.visibility = "visible";
    //});
    document.getElementById("control-container").appendChild(controlDiv);
    let modelOptionDiv = document.createElement("option");
    setAttributes(modelOptionDiv, {
        "value": modelNames[i],
    });
    modelOptionDiv.innerHTML = modelNames[i];
    document.getElementById("model-selector").appendChild(modelOptionDiv);
}

function createShaderSelector(i) {
    /*
                <select 
                    name="shader-selector-3" 
                    id="shader-selector-3" 
                    class="shader-selector" 
                    onchange="updateShader(3)"
                    autocomplete="off"
                >
                    <option selected value="flat">Flat</option>
                    <option value="gouraud">Gouraud</option>
                    <option value="phong">Phong</option>
                </select>
    */
    let shaderSelectDiv = document.createElement("select");
    setAttributes(shaderSelectDiv, {
        "name": `shader-selector-${i}`,
        "id": `shader-selector-${i}`,
        "class": `shader-selector`,
        "autocomplete": "off"
    });
    shaderSelectDiv.addEventListener("change", e => {
        updateShader(i);
    })
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    let option3 = document.createElement("option");
    setAttributes(option1, {
        "value": "flat",
        "selected": "selected"
    });
    setAttributes(option2, {
        "value": "gouraud"
    });
    setAttributes(option3, {
        "value": "phong"
    });
    option1.innerHTML = "Flat";
    option2.innerHTML = "Gouraud";
    option3.innerHTML = "Phong";
    shaderSelectDiv.appendChild(option1);
    shaderSelectDiv.appendChild(option2);
    shaderSelectDiv.appendChild(option3);
    return shaderSelectDiv;
}

function createSliderCollection(sliderIndex, name, index) {
    sliderCollection = document.createElement("div");
    sliderCollection.className = "sliderCollection";
    for(var i = 0; i < sliderIndex.length; i++) {
        if(name == "translate") sliderCollection.appendChild(createSingleSlider(-100, 100, 0, name.concat(sliderIndex[i]), index));
        else if(name == "rotate") sliderCollection.appendChild(createSingleSlider(-180, 180, 0, name.concat(sliderIndex[i]), index));
        else if(name == "scale") sliderCollection.appendChild(createSingleSlider(0.2, 5, 1, name.concat(sliderIndex[i]), index));
        else if(name.includes("shear")) sliderCollection.appendChild(createSingleSlider(-2, 2, 0, name.concat(sliderIndex[i]), index));
        else if(name == "fov") sliderCollection.appendChild(createSingleSlider(10, 170, 45, name.concat(sliderIndex[i]), index));
        else if(name == "specular order") sliderCollection.appendChild(createSingleSlider(1, 300, 100, name.concat(sliderIndex[i]), index));
        else if(name == "ambient intensity") sliderCollection.appendChild(createSingleSlider(0.0, 10, 1, name.concat(sliderIndex[i]), index));
        else if(name == "diffuse intensity") sliderCollection.appendChild(createSingleSlider(0.0, 10, 5, name.concat(sliderIndex[i]), index));
        else if(name == "specular intensity") sliderCollection.appendChild(createSingleSlider(0.0, 10, 3, name.concat(sliderIndex[i]), index));
    }
    return sliderCollection;
}
function createSingleSlider(min, max, value, id, index) {
    let displayValue = value;
    if(id.includes("intensity")) displayValue /= 10;
    sliderDiv = document.createElement("div");
    sliderDiv.className = "slidercontainer";
    sliderInput = document.createElement("input");
    sliderValueDiv = document.createElement("div");
    sliderValueDiv.className = "sliderValueDiv";
    sliderValueDiv.innerHTML = `${id}: ${displayValue}`;
    transformValueDivs[index][id] = sliderValueDiv;
    transformValues[index][id] = displayValue;

    setAttributes(sliderInput, {
        "type": "range",
        "min": min,
        "max": max,
        "value": value,
        "class": "slider",
        "id": id,
        "step": 0.1,
        "autocomplete": "off"
    })

    sliderInput.addEventListener("input", e => {
        let value = e.target.value;
        if(id.includes("intensity")) value /= 10;
        
        let displayValue = parseFloat(value).toFixed(2);
        transformValueDivs[index][id].innerHTML = `${id}: `.concat((displayValue).toString());
        transformValues[index][id] = value;
        // If slider controls FOV, change for all objects.
        if(id.includes("fov")) {
            for(let i = 0; i < transformValues.length; i++) {
                transformValueDivs[i][id].innerHTML = `${id}: `.concat((displayValue).toString());
                transformValues[i][id] = value;
            }
        }
    });
    sliderDiv.appendChild(sliderInput);
    sliderDiv.append(sliderValueDiv);
    return sliderDiv;
}
  