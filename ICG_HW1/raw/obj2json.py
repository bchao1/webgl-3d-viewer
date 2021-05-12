import json
import trimesh 
import numpy as np

input_path = "./suzanne.obj"
output_path = "../model/Suzanne.json"

mesh = trimesh.load(input_path, process=False)

print(mesh.vertices.shape)
print(mesh.vertex_normals.shape)
faces = mesh.faces.reshape(mesh.faces.size)

vertex_pos = mesh.vertices[faces,:]
vertex_normal = mesh.vertex_normals[faces,:]
vertex_pos = vertex_pos.ravel()
vertex_normal = vertex_normal.ravel()
vertex_color = np.ones(vertex_pos.shape, dtype =np.float) * 0.8

data = {
    "vertexPositions": list(vertex_pos),
    "vertexNormals": list(vertex_normal),
    "vertexFrontcolors": list(vertex_color)
}

with open(output_path, 'w') as fp:
    json.dump(data, fp)