export function formatDate (date) {
    return date.toLocaleDateString(
        'en-GB',
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
}