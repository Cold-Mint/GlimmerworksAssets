#version 450
layout(location = 0) in vec2 in_uv;
layout(location = 0) out vec4 out_color;
layout(set = 2, binding = 0) uniform sampler2D inputTexture;
layout(set = 3, binding = 0) uniform TintUniform {
    vec4 u_tintColor;
};
void main() {
    out_color = texture(inputTexture, in_uv) * u_tintColor;
}
