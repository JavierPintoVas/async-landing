const url =
  'https://youtube138.p.rapidapi.com/channel/videos/?id=UCsna10x6Sm-f_Yj6SxdALnQ&filter=videos_latest&hl=en&gl=US';

const content = document.getElementById('content');

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '3b6af6985bmsh28ffac30abeec9ap14f32djsne75882452657',
    'x-rapidapi-host': 'youtube138.p.rapidapi.com',
  },
};

async function fetchData(urlApi) {
  const res = await fetch(urlApi, options);
  const data = await res.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(url);

    if (!videos.contents) throw new Error('No hay videos disponibles');

    let view = `
      ${videos.contents
        .filter((item) => item.type === 'video' && item.video) // Filtra solo los elementos tipo video
        .slice(0, 4)
        .map(
          (item) => `
        <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
            >
              <img
                src="${item.video.thumbnails[0].url}"
                alt="${item.video.title}"
                class="w-full"
              />
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                ${item.video.title}
              </h3>
            </div>
          </div>    
          `
        )
        .join('')}
      `;

    content.innerHTML = view;
  } catch (error) {
    console.log('Error al obtener videos:', error);
  }
})();
