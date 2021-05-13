import json
import trimesh 
from trimesh.visual.texture import TextureVisuals
from PIL import Image
import numpy as np

output_path = "../model/Own.json" # don't change!

input_path = "./dragon.obj" # modify input path
texture_path = None#"./bunny2/texture1.jpg" # modify input path


def normalize_vertices(vertices):
    # Normalize model to a [-50, 50] box
    min_ = np.min(vertices, axis=0)
    max_ = np.max(vertices, axis=0)
    scale = np.max(max_ - min_)
    center = (min_ + max_) * 0.5
    vertices = (vertices - center) / scale
    vertices *= 50
    return vertices

mesh = trimesh.load(input_path, process=False)
print("num vertices: ", mesh.vertices.shape)
print("num vertex normals: ", mesh.vertex_normals.shape)
faces = mesh.faces.reshape(mesh.faces.size)

aligned_vertices = normalize_vertices(mesh.vertices)
vertex_pos = aligned_vertices[faces,:]
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
