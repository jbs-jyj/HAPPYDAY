function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

async function searchHolidays() {

  const year = document.getElementById("year").value;
  let month = document.getElementById("month").value;
  const result = document.getElementById("result");

  if (!year || !month) {
    alert("년도와 월을 입력하세요!");
    return;
  }

  month = month.padStart(2, '0');

  result.innerHTML = "";

  const serviceKey = "ad45fb2710a84c1d182b19ee083b656290d8d385860bd75c7c1ac35d83ad195c";

  const url =
    `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?`
    + `serviceKey=${encodeURIComponent(serviceKey)}`
    + `&solYear=${year}`
    + `&solMonth=${month}`;

  try {

    const response = await fetch(url);
    const text = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = xml.getElementsByTagName("item");

    const today = new Date().toISOString().slice(0,10).replace(/-/g,"");

    for (let item of items) {

      const name = item.getElementsByTagName("dateName")[0].textContent;
      const date = item.getElementsByTagName("locdate")[0].textContent;

      let image = "https://source.unsplash.com/400x300/?korea";

      if (name.includes("어린이")) image = "https://source.unsplash.com/400x300/?children";
      if (name.includes("설")) image = "https://source.unsplash.com/400x300/?newyear";
      if (name.includes("추석")) image = "https://source.unsplash.com/400x300/?moon";

      const isToday = date === today;

      result.innerHTML += `
        <div class="card ${isToday ? 'today' : ''}">
          <img src="${image}">
          <h3>${name}</h3>
          <p>${date}</p>
        </div>
      `;
    }

  } catch (error) {
    alert("API 오류 발생");
    console.error(error);
  }
}
