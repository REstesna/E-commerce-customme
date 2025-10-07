export function makePrice(price) {
  const priceArr = price.toString().split("");

  const reversPriceArr = priceArr.reverse();

  const len = reversPriceArr.length;

  for (let i = 3; i <= len; i += 4) {
    reversPriceArr.splice(i, 0, ",");
  }

  const finalPrice = reversPriceArr.reverse().join("");


  return finalPrice;
}

// function for generate product array in container
export const generateProductInContainer = (container, products) => {

  container.innerHTML = "";

  products.map((p) => {


    container.innerHTML += ` <li class="max-w-[400px] p-4 border border-[var(--gray-4)] rounded-[var(--radius-16)]  ">
                            <!-- product image -->
                            <a href="./detail-product.html?id=${p.id}">
                                <div class="aspect-square flex justify-center items-center overflow-hidden rounded-[var(--radius-8)]"><img class="w-full" loading="lazy" src="${
                                  p.img
                                }" alt="${p.title}"></div>
                            </a>

                            <!-- product content -->
                            <div>
                                <!-- title and like -->
                                <div class="flex justify-between gap-1 items-start my-4">

                                    <a href="./detail-product.html?id=${p.id}">
                                        <h6 class="heading-6 sm:text-[18px] text-[16px]! "> ${
                                          p.title
                                        } </h6>
                                    </a>

                                    <!-- like button  -->
                                    <button id="liked-button" class="cursor-pointer " data-pID="${
                                      p.id
                                    }">
                                        <img class="min-w-6 " src="${
                                          p.isLiked
                                            ? "images/like.svg"
                                            : "images/like-logo.svg"
                                        }" alt="like-button">
                                    </button>

                                </div>

                                <!-- caption & price  -->
                                <div>
                                    <a href="./detail-product.html?id=${p.id}">
                                        <div class="flex justify-between gap-18 sm:gap-10 flex-col">
                                            <span class="block h-12 body-4">دارای رنگ بندی، قابل طراحی</span>
                                            <span class="block heading-6 sm:text-[18px] text-[16px]! text-end">
                                                    ${makePrice(p.price)} تومان
                                                </span>
                                        </div>
                                    </a>
                                </div>

                            </div>

                        </li>`;

  
  });
};
