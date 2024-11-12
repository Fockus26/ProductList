export function CreateViewModel({authToken}) {
    var self = this;

    // Product data
    self.sku = ko.observable('');
    self.code = ko.observable('');
    self.name = ko.observable('');
    self.description = ko.observable('');
    self.price = ko.observable('');
    self.currency = ko.observable('');
    self.images = ko.observableArray([]); // Selected images (not uploaded yet)

    self.cloudName = "drspvzzg8"
    self.uploadPreset = "ml_default"
    // Method to store the selected images
    self.uploadImages = function (_,event) {
        console.log("hola?")
        var files = event.target.files;
        var fileArray = Array.from(files);
        self.images(fileArray); // Save the selected images
        console.log("IMAGES", self.images())
    };

    // Method to submit the form
    self.submitForm = function () {
        var formData = {
            sku: self.sku(),
            code: self.code(),
            name: self.name(),
            description: self.description(),
            price: self.price(),
            currency: self.currency(),
            images: [] // We will store the URLs here
        };

        // Upload images to Cloudinary and get the URLs
        var uploadPromises = self.images().map(function (file) {
            return new Promise(function (resolve, reject) {
                var formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', uploadPreset ); // Your Cloudinary preset here

                $.ajax({
                    url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Cloudinary API URL
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        resolve(response.secure_url);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        });

        // Wait for all images to be uploaded before submitting the form
        Promise.all(uploadPromises).then(function (imageUrls) {
            formData.images = imageUrls; // Assign the uploaded image URLs to the object

            // Send the product information along with the image URLs
            $.ajax({
                url: '/api/products', // Endpoint where the product should be created
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function () {
                    // Success handling (e.g., navigate to a new page, display success message, etc.)
                },
                error: function () {
                    // Error handling (e.g., display error message)
                }
            });
        }).catch(function () {
            // Error handling for image upload failure
        });
    };
}
