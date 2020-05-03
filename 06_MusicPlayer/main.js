const songs = [
    "Becky-G-Break-a-Sweat.mp3",
    "Becky-G-Shower.mp3",
    "Dawin-Throwback.mp3"
]

// Function untuk membuat list otomatis pada html berdasarkan array songs diatas
const createSongList = () => {
    const list = document.createElement('ol')

    for (let i = 0; i < songs.length; i++) {
        const item = document.createElement('li')
        item.appendChild(document.createTextNode(songs[i]));

        list.appendChild(item)
    }
    return list
}

// Menambahkan list audio kedalam div dengan id "songList"
document.getElementById('songList').appendChild(createSongList())

songList.onclick = (e) => {
    const clickItem = e.target
    const source = document.getElementById('source')
    source.src = 'songs/' + clickItem.innerText

    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing: "
    document.getElementById('currentSong').innerText = clickItem.innerText

    player.load()
        // player.play() // Digunakan untuk membuat lagu diputar secara otomatis
}

// Fungsi yang akan dijalankan ketika tombol play di klik
const playAudio = () => {
    if (player.readyState) {
        player.play()
    }
}

// Fungsi yang akan berjalan ketika tombol pause di klik
const pauseAudio = () => {
    player.pause();
}

// Fungsi untuk mengatur volume audio
const slider = document.getElementById('volumeSlider')
slider.oninput = (e) => {
    const volume = e.target.value
    player.volume = volume
}

// Fungsi untuk meng-update progress bar
const updateProgress = () => {
    if (player.currentTime > 0) { //player.currentTime digunakan untuk mengambil posisi waktu musik saat berjalan
        const progressBar = document.getElementById('progress')
        progressBar.value = (player.currentTime / player.duration) * 100 //player.duration digunakan untuk mengambil durasi waktu pada audio
    }

}