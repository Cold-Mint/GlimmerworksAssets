#version 450
layout(location = 0) in vec2 in_uv;
layout(location = 1) in vec4 in_color;
layout(location = 0) out vec4 out_color;
layout(set = 2, binding = 0) uniform sampler2D inputTexture;
layout(set = 3, binding = 0) uniform GlowParams {
    vec4 u_glow_color;
    float u_glow_strength;
    float u_time;
};
void main() {
    vec4 tex = texture(inputTexture, in_uv) * in_color;
    // 明显的暖色发光：叠加橙色光，随时间脉动
    float pulse = 0.5 + 0.5 * sin(u_time * 3.14159265);
    vec3 glow = tex.rgb + u_glow_color.rgb * u_glow_strength * (0.5 + 0.5 * pulse);
    out_color = vec4(glow, tex.a);
}
