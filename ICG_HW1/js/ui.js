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
    controlDiv = document.getElementById(`controls-${i}`);
    controlDiv.appendChild(createSliderCollection([""], "fov", i));
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
    }
    return sliderCollection;
}

function createSingleSlider(min, max, value, id, index) {
    sliderDiv = document.createElement("div");
    sliderDiv.className = "slidercontainer";
    sliderInput = document.createElement("input");
    sliderValueDiv = document.createElement("div");
    sliderValueDiv.className = "sliderValueDiv";
    sliderValueDiv.innerHTML = `${id}: ${value}`;
    transformValueDivs[index][id] = sliderValueDiv;
    transformValues[index][id] = value

    setAttributes(sliderInput, {
        "type": "range",
        "min": min,
        "max": max,
        "value": value,
        "class": "slider",
        "id": id,
        "step": 0.1,
    })
    sliderInput.addEventListener("input", e => {
        transformValueDivs[index][id].innerHTML = `${id}: `.concat((e.target.value).toString());
        transformValues[index][id] = e.target.value;
        // If slider controls FOV, change for all objects.
        if(id.includes("fov")) {
            for(let i = 0; i < transformValues.length; i++) {
                transformValueDivs[i][id].innerHTML = `${id}: `.concat((e.target.value).toString());
                transformValues[i][id] = e.target.value;
            }
        }
    });
    sliderDiv.appendChild(sliderInput);
    sliderDiv.append(sliderValueDiv);
    return sliderDiv;
}
  