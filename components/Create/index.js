export function CreateViewModel({ authToken }) {
    var self = this;

    // Product data
    self.sku = ko.observable('');
    self.code = ko.observable('');
    self.name = ko.observable('');
    self.description = ko.observable('');
    self.price = ko.observable('');
    self.currency = ko.observable('');
    self.images = ko.observableArray([]); // Selected images
    self.token = authToken;
    self.cloudName = "drspvzzg8";
    self.uploadPreset = "ml_default";

    // Error messages for each field
    self.skuError = ko.observable('');
    self.codeError = ko.observable('');
    self.nameError = ko.observable('');
    self.descriptionError = ko.observable('');
    self.priceError = ko.observable('');
    self.currencyError = ko.observable('');
    self.imagesError = ko.observable('');

    // New state for upload success
    self.isUploaded = ko.observable(false);

    // Helper to clear errors when a field is updated
    function clearError(field) {
        if (field) {
            field('');  // Clear specific field error
        }
    }

    // Observables to clear errors when input values change
    self.sku.subscribe(() => clearError(self.skuError));
    self.code.subscribe(() => clearError(self.codeError));
    self.name.subscribe(() => clearError(self.nameError));
    self.description.subscribe(() => clearError(self.descriptionError));
    self.price.subscribe(() => clearError(self.priceError));
    self.currency.subscribe(() => clearError(self.currencyError));
    self.images.subscribe(() => clearError(self.imagesError)); // Clear image error when images change

    // Method to store the selected images
    self.uploadImages = function (_, event) {
        var files = event.target.files;
        self.images(files); // Save the selected images
        if (files.length === 0) {
            self.imagesError('Please select at least one image.');
        } else {
            self.imagesError(''); // Clear error if images are selected
        }
    };

    // Method to validate the form
    self.validateForm = function() {
        let isValid = true;

        if (!self.sku()) {
            self.skuError('SKU is required.');
            isValid = false;
        }
        if (!self.code()) {
            self.codeError('Code is required.');
            isValid = false;
        }
        if (!self.name()) {
            self.nameError('Product name is required.');
            isValid = false;
        }
        if (!self.description()) {
            self.descriptionError('Description is required.');
            isValid = false;
        }
        if (!self.price()) {
            self.priceError('Price is required.');
            isValid = false;
        }
        if (!self.currency()) {
            self.currencyError('Currency is required.');
            isValid = false;
        }
        if (!self.images().length) {
            self.imagesError('Please upload at least one image.');
            isValid = false;
        }

        return isValid;
    };

    // Method to submit the form
    self.submitForm = function() {
        if (!self.validateForm()) return; // Stop if validation fails

        var formData = {
            SKU: self.sku(),
            code: self.code(),
            name: self.name(),
            currency: self.currency(),
            description: self.description(),
            price: self.price(),
            pictures: [], // We will store the URLs here
            __v: 0
        };

        // Upload images to Cloudinary and get the URLs
        const uploadPromises = Array.from(self.images()).map(function(file) {
            return new Promise(function(resolve, reject) {
                var uploadData = new FormData();
                uploadData.append('file', file);
                uploadData.append('upload_preset', self.uploadPreset);
               
                $.ajax({
                    url: `https://api.cloudinary.com/v1_1/${self.cloudName}/image/upload`,
                    type: 'POST',
                    data: uploadData,
                    processData: false,
                    contentType: false, 
                    success: function(response) {
                       
                        resolve(response.secure_url);
                    },
                    error: function(error) {
                        console.error("Error", error);
                        reject(error);
                    }
                });
            });
        });

        // Wait for all images to be uploaded before submitting the form
        Promise.all(uploadPromises).then(function(imageUrls) {
            formData.pictures = imageUrls; // Assign the uploaded image URLs to the form data
        
            // Send the product information along with the image URLs
            $.ajax({
                url: 'http://vps.churrasco.digital:3000/addproduct',
                type: 'POST',
                contentType: 'application/json',
                headers: { 'Authorization': 'Bearer ' + self.token() },
                data: JSON.stringify(formData),
                success: function(res) {
                    // Reset form fields
                    self.sku('');
                    self.code('');
                    self.name('');
                    self.description('');
                    self.price('');
                    self.currency('');
                    self.images([]); // Clear the images array

                    // Set isUploaded to true
                    self.isUploaded(true);

                },
                error: function() {
                    context.redirect("/")
                    
                }
            });
        }).catch(function() {
            console.error("Error uploading images");
        });
    };
}
