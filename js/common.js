let categoriesIds = [];
const categoriesBtn = document.querySelectorAll("[data-id]");
const categoriesBear = document.querySelectorAll(".priority__bear");
const overlay = document.querySelector(".priority__block-overlay");
const allCategoriesBtn = document.querySelectorAll("[data-all]");
const buttonSelect = document.querySelector(".js-menu");
const dropdownSelect = document.querySelector(".js-menu-open");

buttonSelect.addEventListener("click", function () {
  dropdownSelect.classList.toggle("open");
});

document.addEventListener("click", function (event) {
  const clickInside = event.composedPath().includes(dropdownSelect);
  if (!clickInside && !buttonSelect.contains(event.target)) {
    dropdownSelect.classList.remove("open");
  }
});

allCategoriesBtn.forEach((element) => {
  element.addEventListener("click", function () {
    categoriesIds = [];
    visualBanner();
  });
});

const visualBanner = (id, add) => {
  if (categoriesIds.length) {
    overlay.classList.add("active");
    allCategoriesBtn.forEach((element) => element.classList.remove("active"));
  } else {
    overlay.classList.remove("active");
    allCategoriesBtn.forEach((element) => element.classList.add("active"));
    categoriesBtn.forEach((element) => element.classList.remove("active"));
  }

  if (!id && !add) return false;

  const currentBear = document.querySelector(
    '.priority__bear[data-category-id="' + id + '"]'
  );
  const currentCatBtn = document.querySelectorAll('[data-id="' + id + '"]');

  if (add) {
    currentBear.classList.add("active");
    currentCatBtn.forEach((element) => element.classList.add("active"));
  } else {
    currentBear.classList.remove("active");
    currentCatBtn.forEach((element) => element.classList.remove("active"));
  }
};

const categoryCheck = (id, add) => {
  if (add) {
    categoriesIds.push(id);
    visualBanner(id, add);
  } else {
    categoriesIds.forEach((item, index) => {
      if (item == id) categoriesIds.splice(index, 1);
    });
    visualBanner(id, add);
  }
};

categoriesBtn.forEach((element) => {
  element.addEventListener("click", function () {
    let id = element.dataset.id;
    let add = categoriesIds.indexOf(id) != -1 ? false : true;
    categoryCheck(id, add);
  });
});

visualBanner();
