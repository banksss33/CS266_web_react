import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import BMI from "../Page/BMI";
import FatPercentage from "../Page/FatPercentage";
import "../Style/SideNavBar.css";
import { LuMenuSquare } from "react-icons/lu";
import { MdPlayArrow } from "react-icons/md";

function SideNavBar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <div>
      <BrowserRouter>
        <Button
          variant="primary"
          // onMouseOver={handleShow}
          onClick={handleShow}
          style={{
            position: "fixed",
            height : '100%',
            top : 0,
            left: 0,
            zIndex: 1000, // Adjust as needed based on your layout
            backgroundColor: "rgb(255, 122, 56)",
            border: "0",
          }}
        >
          <MdPlayArrow
            style={{
              height: "40px",
              width: "40px",
            }}
          />
        </Button>

        <Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          placement="start"
          scroll={true}
        >
          <Offcanvas.Header closeButton style={{ backgroundColor: "white" }}>
            <Offcanvas.Title class="navtitle">
              <i class="bx bx-dumbbell" style={{ marginRight: "16px" }}></i>
              CS266 N03
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ backgroundColor: "white" }}>
            <div className="d-grid gap-2">
              <LinkContainer to="/react-bmi">
                <Link className="link-text">
                  <button
                    type="button"
                    class="btn btn-outline-warning sideNavBar-button btn-lg"
                  >
                    <i
                      class="bx bx-calculator"
                      style={{ marginRight: "16px" }}
                    ></i>
                    BMI Calculator
                  </button>
                </Link>
              </LinkContainer>
              <LinkContainer to="/FatCal">
                <Link className="link-text">
                  <button
                    type="button"
                    class="btn btn-outline-warning sideNavBar-button btn-lg"
                  >
                    <i class="bx bx-body" style={{ marginRight: "16px" }}></i>
                    Fat Percentage Calculator
                  </button>
                </Link>
              </LinkContainer>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <Routes>
          <Route path="/react-bmi" element={<BMI />} />
          <Route path="/FatCal" element={<FatPercentage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default SideNavBar;
