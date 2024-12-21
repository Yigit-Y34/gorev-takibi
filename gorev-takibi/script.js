let gorevler = [];

function gorevEkle() {
    const gorevAdi = document.getElementById('gorevAdi').value;
    if (gorevAdi) {
        const yeniGorev = {
            ad: gorevAdi,
            durum: 'yapılacak'
        };
        gorevler.push(yeniGorev);
        document.getElementById('gorevAdi').value = '';
        guncelleGorevler();
    }
}

function guncelleGorevler() {
    const gorevlerDiv = document.getElementById('gorevler');
    gorevlerDiv.innerHTML = '';

    gorevler.forEach((gorev, index) => {
        const gorevDiv = document.createElement('div');
        gorevDiv.classList.add('gorev', 'p-4', 'bg-white', 'rounded', 'shadow', 'flex', 'justify-between', 'items-center');
        gorevDiv.innerHTML = `
            <span>${gorev.ad} (${gorev.durum})</span>
            <div class="flex space-x-2">
                <select onchange="durumDegistir(${index}, this.value)" class="border border-gray-300 p-1 rounded">
                    <option value="yapılacak" ${gorev.durum === 'yapılacak' ? 'selected' : ''}>Yapılacak</option>
                    <option value="yapılıyor" ${gorev.durum === 'yapılıyor' ? 'selected' : ''}>Yapılıyor</option>
                    <option value="tamamlandı" ${gorev.durum === 'tamamlandı' ? 'selected' : ''}>Tamamlandı</option>
                </select>
                <button class="sil-btn bg-red-500 text-white p-2 rounded" onclick="gorevSil(${index})">Sil</button>
            </div>
        `;
        gorevlerDiv.appendChild(gorevDiv);
    });

    raporGuncelle();
}

function durumDegistir(index, yeniDurum) {
    gorevler[index].durum = yeniDurum;
    guncelleGorevler();
}

function gorevSil(index) {
    gorevler.splice(index, 1);
    guncelleGorevler();
}

function raporGuncelle() {
    const toplamGorevSayisi = gorevler.length;
    const tamamlananGorevSayisi = gorevler.filter(gorev => gorev.durum === 'tamamlandı').length;

    document.getElementById('toplamGorevSayisi').innerText = `Toplam Görev Sayısı: ${toplamGorevSayisi}`;
    document.getElementById('tamamlananGorevSayisi').innerText = `Tamamlanan Görev Sayısı: ${tamamlananGorevSayisi}`;
}

function filterTasks(filter) {
    const filteredGorevler = gorevler.filter(gorev => filter === 'tümü' || gorev.durum === filter);
    const gorevlerDiv = document.getElementById('gorevler');
    gorevlerDiv.innerHTML = '';

    filteredGorevler.forEach((gorev, index) => {
        const gorevDiv = document.createElement('div');
        gorevDiv.classList.add('gorev', 'p-4', 'bg-white', 'rounded', 'shadow', 'flex', 'justify-between', 'items-center');
        gorevDiv.innerHTML = `
            <span>${gorev.ad} (${gorev.durum})</span>
            <div class="flex space-x-2">
                <select onchange="durumDegistir(${index}, this.value)" class="border border-gray-300 p-1 rounded">
                    <option value="yapılacak" ${gorev.durum === 'yapılacak' ? 'selected' : ''}>Yapılacak</option>
                    <option value="yapılıyor" ${gorev.durum === 'yapılıyor' ? 'selected' : ''}>Yapılıyor</option>
                    <option value="tamamlandı" ${gorev.durum === 'tamamlandı' ? 'selected' : ''}>Tamamlandı</option>
                </select>
                <button class="sil-btn bg-red-500 text-white p-2 rounded" onclick="gorevSil(${index})">Sil</button>
            </div>
        `;
        gorevlerDiv.appendChild(gorevDiv);
    });
}