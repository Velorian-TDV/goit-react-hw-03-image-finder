export default async function PixabayApi(query, currentPage) {
    const apiKey = '37437370-877202df46223cca979279914';
    const URL = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&page=${currentPage}&per_page=12`;

    try {
        const response = await fetch(URL);
        if (!response.ok) return null;
        if (response) return await response.json();
    }
    catch (error) { return null }
}