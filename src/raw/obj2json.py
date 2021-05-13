import json
import trimesh 
from trimesh.visual.texture import TextureVisuals
from PIL import Image
import numpy as np

input_path = "./bunny2/model.obj"
output_path = "../model/Bunny.json"
texture_path = "./bunny2/texture1.jpg"


mesh = trimesh.load(input_path, process=False)
print(mesh.vertices.shape)
print(mesh.vertex_normals.shape)
faces = mesh.faces.reshape(mesh.faces.size)

vertex_pos = mesh.vertices[faces,:]
vertex_normal = mesh.vertex_normals[faces,:]
vertex_pos = vertex_pos.ravel()
vertex_normal = vertex_normal.ravel()
vertex_color = np.ones(vertex_pos.shape, dtype =np.float) * 0.8

if texture_path is not None:
    texture_img = Image.open(texture_path)
    print("texture image size: ", texture_img.size)
    textures = TextureVisuals(uv=mesh.visual.uv, image=texture_img)
    colors = textures.to_color().vertex_colors[:, :3]
    vertex_color = colors[faces, :].ravel() * 1.0 / 255

print(vertex_color.shape)
print(vertex_pos.shape)
print(vertex_normal.shape)

data = {
    "vertexPositions": list(vertex_pos),
    "vertexNormals": list(vertex_normal),
    "vertexFrontcolors": list(vertex_color)
}

with open(output_path, 'w') as fp:
    json.dump(data, fp)
