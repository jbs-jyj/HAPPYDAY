// 🌙 다크모드 기능
function toggleMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    document.body.style.background = "#121212";
    document.querySelector(".container").style.background = "#1e1e1e";
    document.querySelector(".container").style.color = "white";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #ff9a9e, #fad0c4)";
    document.querySelector(".container").style.background = "white";
    document.querySelector(".container").style.color = "black";
  }
}

async function searchHoliday() {

  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;

  const serviceKey =
    encodeURIComponent("여기에_인증키");

  const url =
    `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo` +
    `?serviceKey=${serviceKey}` +
    `&solYear=${year}` +
    `&solMonth=${month}`;

  try {

    const response = await fetch(url);
    const text = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const items = xml.getElementsByTagName("item");
    const result = document.getElementById("result");

    result.innerHTML = "";

    const today = new Date();
    const todayStr =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, '0') +
      String(today.getDate()).padStart(2, '0');

    for (let item of items) {

      const name =
        item.getElementsByTagName("dateName")[0]?.textContent;

      const date =
        item.getElementsByTagName("locdate")[0]?.textContent;

      let todayClass = "";

      if (date === todayStr) {
        todayClass = "today";
      }

      result.innerHTML += `
        <div class="card ${todayClass}">
          <h2>${name}</h2>
          <p>📆 ${date}</p>
        </div>
      `;
    }

  } catch(error) {
    console.error(error);
  }
}
