import React, { useState } from "react";

const FilterMenu = ({ FilterHandler }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(1000000);

  const [mobile, setMobile] = useState(true);
  const [appliances, setAppliances] = useState(true);
  const [electronics, setElectronics] = useState(true);
  const [fashion, setFashion] = useState(true);
  const [beauty, setBeauty] = useState(true);
  const [kitchen, setKitchen] = useState(true);
  const [furniture, setFurniture] = useState(true);
  const [grocery, setGrocery] = useState(true);

  // const [filter, setfilter] = useState([]);

  const applyhandler = (e, cb) => {
    e.preventDefault();

    FilterHandler(
      [
        mobile,
        appliances,
        electronics,
        fashion,
        beauty,
        kitchen,
        furniture,
        grocery,
      ],
      priceFilter
    );
    setShowFilter(false);

    // setMobile(true);
    // setAppliances(true);
    // setElectronics(true);
    // setFashion(true);
    // setBeauty(true);
    // setKitchen(true);
    // setFurniture(true);
    // setGrocery(true);
  };

  return (
    <div className=" ms-1 mt-1 d-inline-block">
      <div className="position-relative">
        <h5 onClick={() => setShowFilter(!showFilter)} className=" border px-2 py-1 rounded">Filter <i className="fa-solid fa-filter"></i></h5>
        {showFilter && (
          <form className=" bg-body-tertiary p-4 border shadow fw-bold position-absolute">
            <div className=" d-flex gap-2 ">
              <div>
                <h6>Category</h6>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input categories"
                      type="checkbox"
                      id="category1"
                      checked={mobile}
                      onChange={(e) => setMobile(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="category1">
                      Mobile
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input categories"
                      type="checkbox"
                      id="category2"
                      checked={appliances}
                      onChange={(e) => setAppliances(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="category2">
                      Appliances
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input categories"
                      type="checkbox"
                      id="category3"
                      checked={electronics}
                      onChange={(e) => setElectronics(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="category3">
                      Electronics
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input categories"
                      type="checkbox"
                      id="category4"
                      checked={fashion}
                      onChange={(e) => setFashion(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="category4">
                      Fashion
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input categories"
                      type="checkbox"
                      id="category5"
                      checked={beauty}
                      onChange={(e) => setBeauty(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="category5">
                      Beauty
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input categories"
                      type="checkbox"
                      id="category6"
                      checked={kitchen}
                      onChange={(e) => setKitchen(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="category6">
                      Kitchen
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input categories"
                      type="checkbox"
                      id="category7"
                      checked={furniture}
                      onChange={(e) => setFurniture(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="category7">
                      Furniture
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input categories"
                      type="checkbox"
                      id="category8"
                      checked={grocery}
                      onChange={(e) => setGrocery(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="category8">
                      Grocery
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h6>Prices</h6>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={(e) => setPriceFilter(1000000)}
                    />
                    All
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={(e) => setPriceFilter(300)}
                    />
                    300
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={(e) => setPriceFilter(1000)}
                    />
                    1,000
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={(e) => setPriceFilter(2000)}
                    />
                    2,000
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={(e) => setPriceFilter(5000)}
                    />
                    5,000
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={(e) => setPriceFilter(10000)}
                    />
                    10,000
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={(e) => setPriceFilter(15000)}
                    />
                    15,000
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={(e) => setPriceFilter(20000)}
                    />
                    20,000
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={(e) => applyhandler(e)}
              className="btn btn-primary my-2"
            >
              Apply Filter
            </button>
          </form>
        )}
      </div>

      {/* price */}
    </div>
  );
};

export default FilterMenu;
