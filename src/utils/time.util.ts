export function convertToStartDateTimeAndDuration(startDateTime: Date, endDateTime: Date): { startDateTime: Date, duration: number } {
    const duration = (endDateTime.getTime() - startDateTime.getTime()) / (60 * 1000); // duration in minute
    return {
        startDateTime,
        duration
    };
}

export function convertToStartAndEndDateTime(startDateTime: Date, duration: number): { startDateTime: Date, endDateTime: Date } {
    const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000);
    return {
        startDateTime,
        endDateTime
    };
}

export function convertToDuration(startDateTime: Date, endDateTime: Date): number {
    return (endDateTime.getTime() - startDateTime.getTime()) / (60 * 1000); // duration in minute
}

export function convertToEndDateTime(startDateTime: Date, duration: number): Date {
    return new Date(startDateTime.getTime() + duration * 60 * 1000);
}

export function subtractOneMinute(dateTime: Date): Date {
    return new Date(dateTime.getTime() - 60 * 1000);
}