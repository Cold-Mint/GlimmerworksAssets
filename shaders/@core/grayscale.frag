#version 450
layout(location = 0) in vec2 in_uv;
layout(location = 0) out vec4 out_color;
layout(set = 2, binding = 0) uniform sampler2D sceneTexture;
layout(set = 3, binding = 0) uniform GrayscaleParams {
    float u_time_of_day;
};
void main() {
    vec4 color = texture(sceneTexture, in_uv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    //Day (noon) = 0, night (midnight) = 1.
    //白天（正午）= 0，夜晚（午夜）= 1。
    float cycle = u_time_of_day / 24.0;
    float intensity = 0.5 + 0.5 * cos(cycle * 6.2831853);
    out_color = vec4(mix(color.rgb, vec3(gray), intensity), color.a);
}
