import React from "react";

const CardHeader = (props) => {
  const { title, btnText, btnClickHandler, textValue, setTextValue } = props;

  console.log({textValue})

  return (
    <div className="roe-card-style mtb-15">
      <div className="roe-card-header module-header">
        <div className="flex-1 mb-3">
          <span className="hash"># </span>{" "}
          <span style={{ fontWeight: 600 }}>{title}</span>
        </div>
        <div>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <div className="search-box me-2 mb-2 d-inline-block">
                <div className="position-relative">
                  <label for="search-bar-0" className="search-label">
                    <span id="search-bar-0-label" className="sr-only">
                      Search this table
                    </span>
                    <input
                      id="search-bar-0"
                      type="text"
                      aria-labelledby="search-bar-0-label"
                      class="form-control "
                      placeholder="Search"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      style={{width: 400}}
                    />
                  </label>
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
            </div>
            <div class="col-sm-8 ">
              <div class="text-sm-end" style={{ float: "right" }}>
                <button
                  type="button"
                  class="btn-rounded mb-2 me-2 btn btn-primary"
                  onClick={btnClickHandler}
                >
                  <i class="mdi mdi-plus me-1"></i> {btnText}
                </button>
              </div>
            </div>
          </div>
        </div>

        {props.children}
      </div>
    </div>
  );
};

export default CardHeader;
