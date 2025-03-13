import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Email, Person, AdminPanelSettings } from "@mui/icons-material";
import { getProfile } from "../services/profile"; 

const AdminDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(); 
        console.log("Profile Data:", response);
        setProfile(response); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/signuplogin"); 
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          در حال بارگذاری اطلاعات...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #d32f2f, #ff7961)",
        padding: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "90%",
          boxShadow: 6,
          borderRadius: 4,
          textAlign: "center",
          padding: 3,
          backgroundColor: "white",
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto",
            backgroundColor: "#d32f2f",
          }}
        >
          <AdminPanelSettings sx={{ fontSize: 60, color: "white" }} />
        </Avatar>

        <CardContent>
          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>
            {profile.FullName}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Person sx={{ marginRight: 1, color: "#d32f2f" }} />
            <Typography variant="body1">{profile.Type}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Email sx={{ marginRight: 1, color: "#d32f2f" }} />
            <Typography variant="body1">{profile.Email}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
