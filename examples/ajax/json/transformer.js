class Transformer {

    transform(json) {

        if(!Array.isArray(json)) {
            return '';
        }

        let html = [
            `<div class="table-container"><table class="table table-striped" style="width: 100%">`
        ];

        if(json.length) {

            html.push('<tbody>');

            html.push(`<tr>
        <th>ID</th>
        <th>Name (Nick)</th>
        <th>Contact Info</th>
        
        <th>Website</th>
        
    </tr>`);

            json.forEach(function (user) {

                html.push(`
<tr>
    <td>${user.id}</td>
    <td>
        ${user.name} (<span style="color: #f80;">${user.username}</span>)
        <br>
        <a class="company-info" data-template="template-company-${user.id}">
        <i class="fa fa-fw fa-building"></i> Company Info
        </a> | 
        <a class="address-info" data-template="template-address-${user.id}">
        <i class="fa fa-fw fa-location-dot"></i> Address Info
        </a>
        
        <template id="template-company-${user.id}">${JSON.stringify(user.company)}</template>
        <template id="template-address-${user.id}">${JSON.stringify(user.address)}</template>
        
    </td>
    <td>
    <a href="mailto:${user.email}" target="_blank"><i class="fa fa-fw fa-envelope"></i> ${user.email}</a> <br>
    
    <a href="tel:${user.phone}" target="_blank"><i class="fa fa-fw fa-phone"></i> ${user.phone}</a>
    
    </td>
    
    <td><a href="https://${user.website}" target="_blank"><i class="fa fa-fw fa-link"></i> ${user.website}</a></td>
   
</tr>
                `);

            });

        } else {
            html.push(`<tr>
<td colspan="8" class="text-center text-danger">No user data available!</td>
</tr>`);
        }

        html.push('</tbody>');

        html.push('</table></div>');

        return html.join('');

    }

}

class CompanyInfoTransformer {

    static transform(jsonText) {

        let company = {};

        try {

            company = JSON.parse(jsonText);

            let markup = [`<ul class="list-group">`];

            markup.push(`<li class="list-group-item"><strong>Company Name:</strong> ${company.name}</li>`);

            markup.push(`<li class="list-group-item"><strong>Catch Phrase:</strong> ${company.catchPhrase}</li>`);

            markup.push(`<li class="list-group-item"><strong>Keywords:</strong> ${company.bs}</li>`);

            markup.push(`</ul>`);

            return markup.join('');

        } catch (error) {

            return `<span class="text-error">Invalid JSON content provided to CompanyInfoTransformer</span>`;

        }
    }


}

class AddressInfoTransformer {

    static transform(addressJsonText) {

        let address = {};

        try {

            address = JSON.parse(addressJsonText);

            let markup = [`<ul class="list-group">`];

            markup.push(`<li class="list-group-item"><strong>Street Address:</strong> ${address.street}</li>`);

            markup.push(`<li class="list-group-item"><strong>Suite:</strong> ${address.suite}</li>`);

            markup.push(`<li class="list-group-item"><strong>City:</strong> ${address.city}</li>`);
            markup.push(`<li class="list-group-item"><strong>Zip Code:</strong> ${address.zipcode}</li>`);

            markup.push(`<li class="list-group-item"><strong>Geo Location:</strong> {${address.geo.lat}, ${address.geo.lng}}</li>`);

            markup.push(`</ul>`);

            return markup.join('');

        } catch (error) {

            return `<span class="text-error">Invalid JSON content provided to AddressInfoTransformer</span>`;

        }
    }


}