import "../Style/ReposDetails.scss";
import "../Style/inputCop.scss";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster, toast } from "react-hot-toast";

function ReposDetails() {
  const [reposData, setReposData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setloader] = useState(false);
  const [showInput, setShowInput] = useState(true);
  let i = 0;
  const userAction = () => {
    if (document.getElementById("in-val").value !== "") {
      sessionStorage.setItem("UN", document.getElementById("in-val").value);
      fetch(
        `https://api.github.com/users/${sessionStorage.getItem("UN")}/repos`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("API Error");
          } else {
            console.log(response.ok);
            return response.json();
          }
        })
        .then((data) => {
          if (data.length === 0) {
            toast.error("This User Is Empty");
            setShowInput(true);
          } else {
            setReposData(data);
            setFilteredData(data);
            setloader(true);
            setShowInput(false);
          }
        })
        .catch(() => {
          toast.error("User not found!");
        });
    } else {
      toast.error("User not found!");
    }
    document.getElementById("in-val").value = "";
  };
  const FilterFun = (ev) => {
    setFilteredData(
      reposData.filter((f) =>
        f.name.toLowerCase().includes(ev.target.value.toLowerCase())
      )
    );
  };
  const BackHome = () => {
    setShowInput(true);
  };

  if (showInput) {
    return (
      <section className="input-sec">
        <Toaster position="top-center" />
        <div className="container">
          <h1>Write GitHub UserName</h1>
          <input type="text" placeholder="github username?" id="in-val" />
          <button to="reposdetails" className="but-in" onClick={userAction}>
            Find Username
          </button>
        </div>
      </section>
    );
  } else {
    return (
      <section className="repos-details">
        {(() => {
          if (!loader) {
            return <Loader />;
          } else {
            return (
              <>
                <div className="container">
                  <div className="header">
                    <div className="user-name">
                      {reposData[0].owner.login} /
                    </div>
                    <input
                      type="text"
                      className="search-in"
                      placeholder="Search By Name"
                      onChange={FilterFun}
                    />
                    <button className="but-in" onClick={BackHome}>
                      Back to Home
                    </button>
                  </div>
                  <div className="table-header">
                    <div className="table-header-el">#</div>
                    <div className="table-header-el flx-wi">Name</div>
                    <div className="table-header-el flx-wi">Description</div>
                    <div className="table-header-el flx-wi">Website</div>
                    <div className="table-header-el flx-wi">Actions</div>
                  </div>
                  {filteredData.map((e) => {
                    return (
                      <div className="table-body" key={e.id}>
                        <div className="table-body-el num-id">{++i} </div>
                        <div className="table-body-el flx-wi">{e.name}</div>
                        <div className="table-body-el flx-wi">
                          {e.description !== null ? (
                            e.description
                          ) : (
                            <span className="not-avai">
                              No Description Found
                            </span>
                          )}
                        </div>
                        <div className="table-body-el flx-wi">
                          {e.homepage !== null ? (
                            <a href={e.homepage} className="homepage-link">
                              {e.homepage}
                            </a>
                          ) : (
                            <span className="not-avai">No Link Available</span>
                          )}
                        </div>
                        <div className="table-body-el flx-wi ">
                          <a href={e.html_url} className="link-ico">
                            <FontAwesomeIcon icon={faFile} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          }
        })()}
      </section>
    );
  }
}

export default ReposDetails;
