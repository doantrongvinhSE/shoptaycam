import { useState, useEffect } from 'react';

const API_URL = 'https://provinces.open-api.vn/api/v1';

const useAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // =========================
  // Lấy danh sách tỉnh/thành phố
  // =========================
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoadingProvinces(true);

        const response = await fetch(`${API_URL}/p/`);

        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }

        const data = await response.json();

        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
        setProvinces([]);
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  // =========================
  // Lấy danh sách quận/huyện
  // =========================
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedProvince) {
        setDistricts([]);
        setWards([]);
        setSelectedDistrict('');
        return;
      }

      try {
        setLoadingDistricts(true);

        const response = await fetch(
          `${API_URL}/p/${selectedProvince}?depth=2`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch districts');
        }

        const data = await response.json();

        setDistricts(data.districts || []);

        // Reset district và ward khi đổi province
        setSelectedDistrict('');
        setWards([]);
      } catch (error) {
        console.error('Error fetching districts:', error);

        setDistricts([]);
        setSelectedDistrict('');
        setWards([]);
      } finally {
        setLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  // =========================
  // Lấy danh sách phường/xã
  // =========================
  useEffect(() => {
    const fetchWards = async () => {
      if (!selectedDistrict) {
        setWards([]);
        return;
      }

      try {
        setLoadingWards(true);

        const response = await fetch(
          `${API_URL}/d/${selectedDistrict}?depth=2`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch wards');
        }

        const data = await response.json();

        setWards(data.wards || []);
      } catch (error) {
        console.error('Error fetching wards:', error);
        setWards([]);
      } finally {
        setLoadingWards(false);
      }
    };

    fetchWards();
  }, [selectedDistrict]);

  return {
    // Data
    provinces,
    districts,
    wards,

    // Selected values
    selectedProvince,
    selectedDistrict,

    // Setters
    setSelectedProvince,
    setSelectedDistrict,

    // Loading
    loadingProvinces,
    loadingDistricts,
    loadingWards,

    // Loading tổng
    loading:
      loadingProvinces ||
      loadingDistricts ||
      loadingWards,
  };
};

export default useAddress;