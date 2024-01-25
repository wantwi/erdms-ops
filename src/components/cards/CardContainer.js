import React from 'react'


const CardContainer = (props) => {
    const {search,button, Btntext,title,icon, handleModelForm} = props
  return (
    <div className="plr-15">
    <div className="roe-card-style mtb-15">
      <div className="roe-card-header module-header">
        <div className="flex-1 mb-3">
          <span className={icon}></span>{" "}
          <span style={{ fontWeight: 600 }}>{title}</span>
        </div>
        <div>
          <div className="mb-2 row">
            <div className="col-sm-4">
              {search ?<div className="search-box me-2 mb-2 d-inline-block">
                <div className="position-relative">
                  <label for="search-bar-0" className="search-label">
                    <span id="search-bar-0-label" className="sr-only">
                      Search
                    </span>
                    <input
                      id="search-bar-0"
                      type="text"
                      aria-labelledby="search-bar-0-label"
                      class="form-control "
                      placeholder="Search"
                      style={{ width: 400 }}
                    />
                  </label>
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>:null}
            </div>
            <div class="col-sm-8 ">
              <div class="text-sm-end" style={{ float: "right" }}>
                <button
                  type="button"
                  class="btn-rounded mb-2 me-2 btn btn-primary"
                  onClick={handleModelForm}
                >
                  <i class="mdi mdi-plus me-1"></i> {Btntext}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     <div className="roe-card-header module-header">
            {props.children}
    </div>
    </div>
  </div>
  )
}

export default CardContainer