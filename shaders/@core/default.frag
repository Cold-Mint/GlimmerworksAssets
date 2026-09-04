#version 450
layout(location = 0) in vec2 in_uv;
layout(location = 1) in vec4 in_color;
layout(location = 0) out vec4 out_color;
layout(set = 2, binding = 0) uniform sampler2D inputTexture;
void main() {
    out_color = texture(inputTexture, in_uv) * in_color;
}
