#version 450
layout(location = 0) in vec2 in_uv;
layout(location = 0) out vec4 out_color;
layout(set = 2, binding = 0) uniform sampler2D sceneTexture;
layout(set = 2, binding = 1) uniform sampler2D lightMap;
layout(set = 3, binding = 0) uniform LightingParams {
    vec4 u_p0;
    vec4 u_p1;
    vec4 u_p2;
    vec4 u_p3;
};
void main() {
    vec4 scene = texture(sceneTexture, in_uv);
    vec2 screenPx = in_uv * u_p1.zw;
    vec2 worldPx;
    worldPx.x = u_p1.x + (screenPx.x - u_p1.z * 0.5) / u_p2.x;
    worldPx.y = u_p1.y + (u_p1.w * 0.5 - screenPx.y) / u_p2.x;
    vec2 worldTile = worldPx / u_p2.y;
    vec2 lightUv;
    lightUv.x = (worldTile.x - u_p0.x + 0.5) / u_p0.z;
    lightUv.y = (u_p0.y + u_p0.w - worldTile.y - 0.5) / u_p0.w;
    vec4 light = texture(lightMap, lightUv);
    float brightness = light.a;
    float visibility = max(brightness, u_p2.w);
    vec3 tint = mix(vec3(1.0), light.rgb, u_p3.x * brightness);
    out_color = vec4(scene.rgb * visibility * tint, scene.a);
}
