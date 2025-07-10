# Flood_depth_map

## Overview
This project analyzes flood hazard depth and extent over a specific roi within India using the JRC Global River Flood Hazard Maps Version 1 dataset in Google Earth Engine (GEE). It visualizes flood depths for multiple return periods (20, 50, 100, 200, 500 years), compares flooded areas, and calculates differences in flood depths between selected return periods within the study area. 

Flood depth for Return Period of 20 years
<img width="1920" height="1080" alt="Screenshot (235)" src="https://github.com/user-attachments/assets/d21281ce-4b20-44d4-9902-edcab1aaf0a0" />

Flood depth for Return Period of 50 years
<img width="1920" height="1080" alt="Screenshot (236)" src="https://github.com/user-attachments/assets/0a297512-154a-409f-92ea-9710d3c13e3e" />

Flood depth for Return Period of 100 years
<img width="1920" height="1080" alt="Screenshot (237)" src="https://github.com/user-attachments/assets/d6da9362-c0ba-4b61-adc5-22c618d69002" />

Flood depth for Return Period of 200 years
<img width="1920" height="1080" alt="Screenshot (238)" src="https://github.com/user-attachments/assets/2429d7ec-8a40-46e6-8d07-9737013cddda" />

Flood depth for Return Period of 500 years
<img width="1920" height="1080" alt="Screenshot (239)" src="https://github.com/user-attachments/assets/6650fb0d-4504-4b28-bfbf-4ee4b5df2925" />

Flood depth difference (RP500 - RP20)
<img width="1920" height="1080" alt="Screenshot (240)" src="https://github.com/user-attachments/assets/6b5d9fac-385d-42a8-a14f-0c80cef40afb" />

Flooded area vs Return Period
<img width="1920" height="833" alt="Screenshot (242)" src="https://github.com/user-attachments/assets/007d6907-1fb1-4b30-adb3-ec1b9c5a2107" />


## Data
- Dataset: JRC Global River Flood Hazard Maps Version 1 (JRC/GLOBAL_FLOOD_RISK/V1)
- Study Area: Defined geometry covering part of India (user-defined)
- Flood Return Periods Analyzed: 20, 50, 100, 200, 500 years

## Notes
1. Pixel values represent flood depth in meters.
2. Scale used is 30 meters (JRC dataset native resolution).
3. The flooded pixel count is a proxy for flooded area (number of pixels with depth > 0).
4. This analysis covers only a specific part of India defined by the user geometry, not the entire country.




