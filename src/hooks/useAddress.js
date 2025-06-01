import { useState, useEffect } from 'react';

const useAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://provinces.open-api.vn/api/?depth=1');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Lấy danh sách quận/huyện khi chọn tỉnh/thành phố
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedProvince) {
        setDistricts([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
        const data = await response.json();
        setDistricts(data.districts);
      } catch (error) {
        console.error('Error fetching districts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  // Lấy danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    const fetchWards = async () => {
      if (!selectedDistrict) {
        setWards([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
        const data = await response.json();
        setWards(data.wards);
      } catch (error) {
        console.error('Error fetching wards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWards();
  }, [selectedDistrict]);

  return {
    provinces,
    districts,
    wards,
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
    loading
  };
};

export default useAddress; 