import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditSpot } from "../../store/spots";
import "./index.css"

function EditSpotForm() {
    const spots = useSelector((state) => state.spots)
    console.log('this is edit component spots', spots)
    const { spotId } = useParams();
    const spotObj = useSelector((state) => state.spots)
    const spot = spotObj[spotId];

    console.log('edit prop spot', spot);
    console.log('edit prop', spotObj);

    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState(spot.name)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    // const [lat, setLat] = useState(0)
    // const [lng, setLng] = useState(0)
    //const [previewImage, setPreviewImage] = useState(spot.previewImage)
    const [price, setPrice] = useState(spot.price)
    const [description, setDescription] = useState(spot.description)
    const [error, setErrors] = useState([])

    useEffect(() => {
        const validateError = [];

        if (name.length > 25) validateError.push('please include a name under 25 characters')
        if (address.length > 25) validateError.push('please include a Address under 25 characters')
        if (city.length > 25) validateError.push('please include a city under 25 characters')
        if (state.length > 25) validateError.push('please include a state under 25 characters')
        if (country.length > 25) validateError.push('please include a country under 25 characters')
        if (description.length > 50) validateError.push('please include a city under 50 characters')
        if (name === '') validateError.push('please include a name')
        if (address === '') validateError.push('please include a Address')
        if (city === '') validateError.push('please include a city')
        if (state === '') validateError.push('please include a state')
        if (country === '') validateError.push('please include a country')
        if (description === '') validateError.push('please include a description')
        if (price <= 0) validateError.push('price must be greater than 0');

        setErrors(validateError);

    }, [name, address, city, state, country, description, price])

    const editSubmitter = (e) => {
        // e.preventDefault();
        let editedSpot = { name, address, city, state, country, price, description }
        const payload = { formInfo: editedSpot, spotId }
        dispatch(EditSpot(payload))
        history.push(`/spots/${spotId}`);
    }



    return (
        <form
            className="editForm"
            onSubmit={editSubmitter}>
            <ul className="er">
                {error.length > 0 &&
                    error.map(err => (
                        <li key={err}>{err}</li>
                    ))
                }
            </ul>
            <label>
                Name
                <input
                    type='text'
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Address
                <input
                    type='text'
                    name="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <label>
                City
                <input
                    type='text'
                    name="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>
            <label>
                State
                <input
                    type='text'
                    name="state"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </label>
            <label>
                Country
                <input
                    type='text'
                    name="country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            {/* <label>
                Latitude
                <input
                    type='number'
                    name="latitude"
                    required
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
            </label>
            <label>
                Longitude
                <input
                    type='number'
                    name="longitude"
                    required
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
            </label> */}
            {/* <label>
                Preview Image
                <input
                    type='text'
                    name="image"
                    required
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
            </label> */}
            <label>
                Price
                <input
                    type='number'
                    name="price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <label>
                Description
                <input
                    type='text'
                    name="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button className="send" type='submit' disabled={!!error.length}>SUBMIT</button>
        </form>
    )
}


export default EditSpotForm;
