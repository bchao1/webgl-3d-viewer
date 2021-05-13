# 3D Viewer

3D viewer in WebGL and pure Javascript.

![Viewer](./imgs/viewer.png)

## Features
- Controllable Phong illumination model:
    - Ambient intensity
    - Diffuse intensity
    - Specular intensity
    - Specular order
- Controllable light source colors (currently 3 light sources)
- Controllable geometry:
    - Translation
    - Scaling
    - Rotation
    - 3D shear
- Controllable camera:
    - FOV (field of view)
- Controllable models
- Toggle Y-axis rotation animation

## Shadings
|Flat|Gouraud|Phong|
|--|--|--|
|![flat](./imgs/flat.png)|![gouraud](./imgs/gouraud.png)|![phong](./imgs/phong.png)|
|![flat](./imgs/flat-close.png)|![gouraud](./imgs/gouraud-close.png)|![phong](./imgs/phong-close.png)|

## Phong illumination model
> "Suzanne" a.k.a Blender Monkey.

|Ambient|Diffuse|Specular|Full|
|--|--|--|--|
|![ambient](./imgs/ambient.png)|![diffuse](./imgs/diffuse.png)|![specular](./imgs/specular.png)|![full](./imgs/full.png)|

|Low specular order (metal-like)|High specular order (glossy)|
|--|--|
|![spec-low](./imgs/spec-low.png)|![spec-high](./imgs/spec-high.png)|

## Model transformations
> "Stanford Bunny"

|Original|Rotate|Translate|Scale|Shear|
|--|--|--|--|--|
|![orig](./imgs/orig.png)|![rotate](./imgs/rotate.png)|![translate](./imgs/translate.png)|![scale](./imgs/scale.png)|![shear](./imgs/shear.png)|

## Using your own model

You can modify line 843,844 in `index.html` to use your own model. Concretely, comment out the predefined models `modelNames = ["buddha", "teapot", "bunny", "suzanne"];` and change to `modelNames = ["own"];`. THe program will load the `./src/model/Own.json` file and render it.
   
To generate the `Own.json` file, use the `obj2json.py` script in `./src/raw`. The script loads a `.obj` file and (optinally) a texture atlas and outputs the json file to `./src/model/Own.json`. Modify `input path` and `texture_path` inside the script.


