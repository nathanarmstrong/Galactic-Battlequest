// queries file should only be for queries used in more than one part of the program //

module.exports = (knex) => {
  return {

    saveUser: (user, callback) => {
          knex
          .returning('id')
          .insert({
            name:        user.name,
            email:       user.email,
            password:    user.password
          }).into('users')
          .then((idArr) => {
            user.id = idArr[0];
            console.log('user.id', user.id);
            callback(user);
          })
          .catch(function(err){
            console.log('Error', err.message);
          });
        },


  // I will change all resources to friend //
     saveResource: (resource, callback) => {
        resource.likes_count = 0;
        resource.avg_rating = 0;
        resource.tags =[];
        knex
        .returning('id')
        .insert({
          user_id:        resource.user_id,
          resource_url:   resource.url,
          title:          resource.title,
          description:    resource.description,
          likes_count:    resource.likes_count,
          avg_rating:     resource.avg_rating,
        }).into('resources')
        .then((idArr) => {
          resource.id = idArr[0];
          let tagMap = resource.tags.map(catID => ({tag_id: catID, resource_id: resource.id}));
          return knex.insert(tagMap).into('resource_tags');
        })
        .then(() => {
          callback(resource);
        })
        .catch(function(err){
          console.log('Error', err.message);
        });
      },


      // getResource gets a single resource object and the comments array (might change this later) //
      getResource: (resourceID, callback) => {
        let resrc;
        knex
        .select('*')
        .from('resources')
        .where('resources.id', resourceID)
        .then((thisResourcesArr) => {
          resrc = thisResourcesArr[0];
        }).then(() => {
          knex
          .select('*')
          .from('comments')
          .where('resource_id', resourceID)
          .then((commentsArr) => {
            resrc.comments = commentsArr.sort(sortNewest);
            callback(resrc);
          })
        });
      },


      // getResourcesBySearch gets resources with the associated search tag, title, description and url //
      getResourcesBySearch: (data, callback) => {
        console.log('data in search query', data);

        let tagIDs = data.tagIDs;
        let searchTerm = data.search;
        console.log('tagIDs', tagIDs);
        const approximateTerm = `%${searchTerm}%`.toLowerCase(); // searches description for a match

        //may need to recheck the pluralization with: tags //
        tagIDs = tagIDs || knex.select('id').from('tags');

        return knex
        .distinct('resource_id').select().from('resource_tags').where('tag_id', 'in', tagIDs)
        .then((result) => {
          console.log('result', result);
          result = result.map(obj => obj.resource_id);
          return knex.select('*').from('resources').where('id', 'in', result);
        }).then((r) => {
            console.log('r', r);
          let searchResult = r.filter(res => {
            console.log('res', res);
            return (
            (res.title && res.title.toLowerCase().includes(searchTerm)) ||
            (res.url && res.url.toLowerCase().includes(searchTerm)) ||
            (res.description && res.description.toLowerCase().includes(searchTerm)));
          });

          callback(searchResult.sort(sortNewest));
        });
      },

   // end of queries.js //
  };
}




