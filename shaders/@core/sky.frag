#version 450
layout(location = 0) in vec2 in_uv;
layout(location = 1) in vec4 in_color;
layout(location = 0) out vec4 out_color;
layout(set = 3, binding = 0) uniform SkyParams {
    vec4 u_sky_top;
    vec4 u_sky_horizon;
    float u_time;
};
void main() {
    float h = clamp(in_uv.y, 0.0, 1.0);
    vec3 color = mix(u_sky_horizon.rgb, u_sky_top.rgb, h);
    out_color = vec4(color, 1.0);
}
