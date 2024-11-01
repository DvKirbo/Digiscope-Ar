import { Viro3DObject, ViroAmbientLight, ViroARImageMarker } from "@reactvision/react-viro";

export default function ArCards({target,type, scale, model, onAnchorFound}){
    return(
        <ViroARImageMarker target={target} onAnchorFound={onAnchorFound} >
            <ViroAmbientLight color={"#ffffff"} />
            <Viro3DObject 
                source={model}
                type={type}
                scale={scale}
                lightReceivingBitMask={5}
                shadowCastingBitMask={4}
                animation={{name: "rotate", run: true, loop: true}}
                />
        </ViroARImageMarker>
    )
};