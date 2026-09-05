#version 450
layout(location = 0) in vec2 in_uv;
layout(location = 0) out vec4 out_color;
layout(set = 2, binding = 0) uniform sampler2D sceneTexture;
layout(set = 2, binding = 1) uniform sampler2D lightMap;
layout(set = 3, binding = 0) uniform LightingParams {
    vec2 u_lightmap_origin;
    vec2 u_lightmap_size;
    vec2 u_camera_position;
    vec2 u_camera_size;
    float u_zoom;
    float u_tile_size;
    float u_min_visibility;
    float u_tint_strength;
};
void main() {
    vec4 scene = texture(sceneTexture, in_uv);
    vec2 screenPx = in_uv * u_camera_size;
    vec2 worldPx;
    worldPx.x = u_camera_position.x + (screenPx.x - u_camera_size.x * 0.5) / u_zoom;
    worldPx.y = u_camera_position.y + (u_camera_size.y * 0.5 - screenPx.y) / u_zoom;
    vec2 worldTile = worldPx / u_tile_size;
    vec2 lightUv;
    lightUv.x = (worldTile.x - u_lightmap_origin.x + 0.5) / u_lightmap_size.x;
    lightUv.y = (u_lightmap_origin.y + u_lightmap_size.y - worldTile.y - 0.5) / u_lightmap_size.y;
    vec4 light = texture(lightMap, lightUv);
    float brightness = light.a;
    float visibility = max(brightness, u_min_visibility);
    vec3 tint = mix(vec3(1.0), light.rgb, u_tint_strength * brightness);
    out_color = vec4(scene.rgb * visibility * tint, scene.a);
}
