# Creating a new component

Create an `Example` component in the commons/components folder.

```bash
ng generate component commons/components/Example
```
Set the component name and selector using the `tg` prefix and remove the unused OnInit function

```ts
@Component({
  selector: 'tg-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgExampleComponent {

  constructor() { }

}
```
Where possible, we should try to maintain the same element interface as the standard HTML elements. Let's say we create a tgButton, we can expect it to implement a class, type, disabled or aria-label attributes plus any other required Inputs, such as the variant.

As a reminder

- `@Attribute` will read an attribute from the host tag and bind it to a component variable once, on the constructor. This is useful for binding attributes that won't change.
- `@Hostbinding` is the same as @Attribute, but the binding will be listened for changes in the host and updated in the component.

Implement the `:host` selector in the CSS to set the styles of the host container.

Use the `ChangeDetectionStrategy.OnPush` by default meaning that automatic change detection is deactivated. Change detection can still be explicitly invoked.


## Testing

For testing we're using [spectator](https://github.com/ngneat/spectator). This is the test of the previous service example.

```ts
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TgExampleComponent } from './example.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<TgExampleComponent>;
  const createComponent = createComponentFactory(TgExampleComponent);

  beforeEach(() => spectator = createComponent({
    // The component inputs
    props: {
      name: 'example'
    },
    // Override the component's providers
    providers: [],
    // Whether to run change detection (defaults to true)
    detectChanges: false
  }));

  it('should have a success class by default', () => {
    // This test checks that the input attribute name becomes a class in the component structure
    expect(spectator.query('div')).toHaveClass('example');
  });
});
```











Creating a service

```bash
ng g service api/example/ExampleApi
```

Add the new service to the module providers and remove `providedIn: 'root'` from the `@Injectable` decorator.

If we're going to have multiple services in this module we must create a `services` folder.

We also have to create the interface models, in this example in `src/app/api/example/example.model.ts`

Api service example

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import { Example } from './example.model';

@Injectable()
export class ExampleApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getData() {
    return this.http.get<Example>(`${this.config.apiUrl}/example`);
  }
}
```

For testing we're using [spectator](https://github.com/ngneat/spectator). This is the test of the previous service example.

```ts
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { ExampleApiService } from './example-api.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';

describe('ExampleApiService', () => {
  let spectator: SpectatorHttp<ExampleApiService>;
  const createHttp = createHttpFactory({
    service: ExampleApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get data', () => {
    spectator.service.getData().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/example`, HttpMethod.GET);
  });
});
```

For requests with query params we can use `buildQueryParams`, which will transform the object to an HttpRequest with the proper value transformation to string. We can also set new keys with the param `keyMap`.

```ts
  public list(filter: Partial<UserstoryFilter>) {
    const keyMap = {
      milestoneIsNull: 'milestone__isnull',
      statusIsArchived: 'status__is_archived',
      statusIsClosed: 'status__is_closed',
    };

    const params = UtilsService.buildQueryParams(filter, keyMap);

    return this.http.get<UserstoryList[]>(this.base, {
      params,
    });
  }
```


For attachments we can use `buildFormData`, which will transform the object to `FormData`.

```ts
  public createAttachment(attachment: AttachmentCreationData) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.post<Attachment>(`${this.base}/attachments`, formData);
  }

```
