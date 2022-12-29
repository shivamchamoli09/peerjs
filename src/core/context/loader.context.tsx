import React from "react";

export interface ILoaderContext {
    loader: boolean;
    setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoaderContext = React.createContext<ILoaderContext | null>(null)


// {
//     loader: false,
//     colors: [] as string[],
//     setLoader(val: boolean) {
//         this.loader = val;
//     },
//     setColors(colors: string[]) {
//         this.colors = colors;
//     }
// }