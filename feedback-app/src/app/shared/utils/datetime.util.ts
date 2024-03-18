export const utcToISTFormat = (UTCDateString: string) => {
    const UTCDate = new Date(UTCDateString);
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const ISTTimeInMillis = UTCDate.getTime() + ISTOffset;
    const ISTDate = new Date(ISTTimeInMillis);

    // Convert to human-readable string
    return ISTDate.toLocaleString();
}