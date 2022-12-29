import * as React from "react";
import { motion, MotionConfig } from "framer-motion";
import { ILoaderContext, LoaderContext } from "../../../core/context/loader.context";
import { Box, Typography } from "@mui/material";
import store from "../../../core/stores/root/store";

const ballStyle = {
    display: "block",
    width: "1.4rem",
    height: "1.4rem",
    backgroundColor: "black",
    borderRadius: "1.4rem",
    marginLeft: '5px',
    marginRight: '5px'
};

const bounceTransition1 = {
    y: {
        duration: 0.6,
        yoyo: Infinity,
        ease: "easeOut"
    },
    backgroundColor: {
        duration: 0,
        yoyo: Infinity,
        ease: "easeOut",
        repeatDelay: 0.8
    }
};
const bounceTransition2 = {
    y: {
        duration: 0.8,
        yoyo: Infinity,
        ease: "easeOut"
    },
    backgroundColor: {
        duration: 0,
        yoyo: Infinity,
        ease: "easeOut",
        repeatDelay: 0.8
    }
};

export default function LoaderComponent({ children, colors }: { children?: any, colors?: Array<string> }) {
    const [loader, setLoader] = React.useState(false);
    store?.subscribe(() => {
        const loader = store?.getState()?.loaderStore?.loader;
        setLoader(loader);
    })

    return loader ? (
        <Box>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    position: 'absolute',
                    left: '50%',
                    top: '50%'
                }}
            >
                <motion.span
                    style={ballStyle}
                    transition={bounceTransition1}
                    animate={{
                        y: ["150%", "-150%"],
                        backgroundColor: [`${colors?.length && colors[0] ? colors[0] : '#ff6699'}`, "#6666ff"]
                    }}
                />
                <motion.span
                    style={ballStyle}
                    transition={bounceTransition2}
                    animate={{
                        y: ["100%", "-100%"],
                        backgroundColor: [`${colors?.length && colors[1] ? colors[1] : '#ff6699'}`, "#6666ff"]
                    }}
                />
                <motion.span
                    style={ballStyle}
                    transition={bounceTransition2}
                    animate={{
                        y: ["50%", "-50%"],
                        backgroundColor: [`${colors?.length && colors[2] ? colors[2] : '#ff6699'}`, "#6666ff"]
                    }}
                />
            </div>
            {/* <Typography variant="h6" >Generating results for you. Just a sec...</Typography> */}
        </Box>
    ) :
        <>
        </>
} 