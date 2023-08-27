import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const validationSchema = yup.object({
    search: yup
        .string('Enter your search query')
        .required('Enter field before you search for'),
});

const SearchInput = () => {

    const navigate = useNavigate(); // to navigate user

    const onSubmit = (values, actions) => {
        //alert(values.search);
        const { search } = values;
        if (search.trim()) {
            navigate(`/search/${search}`);
        } else {
            navigate('/');
        }
        actions.resetForm(); // reset form
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },

        validationSchema: validationSchema,
        onSubmit
    });

    return (

        <form onSubmit={handleSubmit} style={{ width: '50%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {/* <Search> */}

                <InputBase sx={{ bgcolor: 'white', padding: '10px' }}
                    fullWidth={true}
                    id="search"
                    name="search"
                    label="search"
                    placeholder='ex: developer, frontend, backend'
                    value={values.search}
                    onChange={handleChange}
                    error={touched.search && Boolean(errors.search)}
                // helperText={touched.search && errors.search}
                />

                <Button color="primary" variant="contained"  endIcon={<SearchIcon />} type="submit" disabled={isSubmitting}>
                    Search
                </Button>
            </Box>
            <Box component='span' sx={{ color: 'orange' }}>{touched.search && errors.search}</Box>
        </form>

    );
};

export default SearchInput;