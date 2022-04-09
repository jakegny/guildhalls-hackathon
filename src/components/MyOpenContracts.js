import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkIcon from "@mui/icons-material/Work";
import {
  getContractsForClient,
  newContract,
  getOpenContracts,
  assignWorker,
} from "../utils/workContractFactoryUtils";
import * as TypeOfWork from "../utils/TypeOfWork";

export default function HireAPro() {
  const workContractFactoryMethods = useSelector(
    state => state?.contract?.workContractFactory?.methods,
  );
  const userAddress = useSelector(state => state?.user?.userAddress);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {
    if (!userAddress) return;
    if (!workContractFactoryMethods.getContractsForClient) return;
    const openContracts = await getContractsForClient(
      workContractFactoryMethods,
      userAddress,
    );
    console.log("openContracts", openContracts);
    // const createdContract = await newContract(
    // 	workContractFactoryMethods,
    // 	userAddress,
    // 	typeOfWork,
    // );
  }, [userAddress]);

  return (
    <div>
      <h1>My Contracts</h1>
    </div>
  );
}
