declare const ANDROID_BUILDS: Record<string, {
    codename: string;
    builds: {
        buildId: string;
        version: string;
    }[];
}>;
export default ANDROID_BUILDS;
